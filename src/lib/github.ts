import { Octokit } from '@octokit/rest';
import { codeToHtml } from 'shiki';

export type Snippet = {
  repo: string;      // ex: "thiagoborba/portifolio-front"
  filename: string;  // nome do arquivo de onde o snippet foi extraído
  html: string;      // código já renderizado como HTML com syntax highlight
};

// Repositórios que serão escaneados em busca de snippets de código
const REPOS = [
  { owner: 'thiagoborba', repo: 'portifolio-front' },
  { owner: 'thiagoborba', repo: 'briefing2task-front' },
  { owner: 'thiagoborba', repo: 'design-system' },
  { owner: 'thiagoborba', repo: 'frontend-challenge' },
  { owner: 'thiagoborba', repo: 'chartOfAccounts' },
];

// Apenas arquivos TypeScript/TSX são considerados interessantes
const INTERESTING_EXTENSIONS = ['.tsx', '.ts'];

// Arquivos de configuração que não contêm código relevante para exibição
const CONFIG_FILES = new Set([
  'next.config.ts',
  'next.config.js',
  'next.config.mjs',
  'tailwind.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'jest.config.ts',
  'jest.config.js',
  'eslint.config.mjs',
  '.eslintrc.js',
  'vite.config.ts',
]);

// Funções muito curtas tendem a ser triviais; muito longas, difíceis de exibir
const MIN_FUNCTION_LINES = 5;
const MAX_FUNCTION_LINES = 50;

/**
 * Extrai blocos de funções de um arquivo TypeScript/TSX.
 *
 * Suporta as formas mais comuns de declaração:
 *   - `function foo() { ... }`
 *   - `export default async function() { ... }`
 *   - `const foo = () => { ... }`
 *   - `const foo = async ( ... ) => { ... }`
 */
function extractFunctions(code: string): string[] {
  const lines = code.split('\n');
  const functions: string[] = [];

  // Regex que detecta o início de uma declaração de função
  const FUNCTION_START =
    /^(export\s+)?(default\s+)?(async\s+)?function\s+\w*|^(export\s+)?const\s+\w+[^=]+=\s*(async\s*)?\(/;

  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const currentLine = lines[lineIndex].trimStart();

    if (!FUNCTION_START.test(currentLine)) {
      lineIndex++;
      continue;
    }

    // Encontramos o início de uma função — agora rastreamos os delimitadores
    // para saber quando ela termina (braces `{}` e parens `()` precisam fechar)
    const functionStartLine = lineIndex;
    let openBraces = 0;
    let openParens = 0;
    let bodyStarted = false;

    for (let j = lineIndex; j < lines.length; j++) {
      for (const char of lines[j]) {
        if (char === '{') { openBraces++; bodyStarted = true; }
        else if (char === '}') { openBraces--; }
        else if (char === '(') { openParens++; bodyStarted = true; }
        else if (char === ')') { openParens--; }
      }

      // Quando todos os delimitadores fecharam, a função terminou
      const functionClosed = bodyStarted && openBraces === 0 && openParens === 0;
      if (functionClosed) {
        const functionBlock = lines.slice(functionStartLine, j + 1);
        const isWithinSizeRange =
          functionBlock.length >= MIN_FUNCTION_LINES &&
          functionBlock.length <= MAX_FUNCTION_LINES;

        if (isWithinSizeRange) {
          functions.push(functionBlock.join('\n'));
        }

        lineIndex = j + 1;
        break;
      }
    }

    // Nenhum delimitador foi encontrado na linha — avança e tenta a próxima
    if (!bodyStarted) lineIndex++;
  }

  return functions;
}

/**
 * Busca um snippet de código de um repositório específico.
 *
 * Estratégia:
 * 1. Lista todos os arquivos do repositório
 * 2. Prioriza arquivos dentro de `src/` e em subpastas (tendem a ser mais relevantes)
 * 3. Para cada arquivo candidato, extrai a primeira função válida encontrada
 * 4. Converte o código para HTML com syntax highlight usando Shiki
 */
async function fetchSnippetForRepo(
  octokit: Octokit,
  owner: string,
  repo: string,
): Promise<Snippet | null> {
  try {
    // Obtém a árvore completa de arquivos do repositório
    const { data: tree } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: 'HEAD',
      recursive: '1',
    });

    // Filtra e ordena os arquivos mais relevantes primeiro
    const candidateFiles = tree.tree
      .filter((file) =>
        file.type === 'blob' &&
        INTERESTING_EXTENSIONS.some((ext) => file.path?.endsWith(ext)) &&
        !CONFIG_FILES.has(file.path?.split('/').pop() ?? ''),
      )
      .map((file) => file.path!)
      .sort((a, b) => {
        // Arquivos dentro de `src/` e com mais níveis de pasta recebem pontuação maior
        const score = (path: string) =>
          (path.includes('src/') ? 1 : 0) + (path.split('/').length > 2 ? 1 : 0);
        return score(b) - score(a);
      });

    // Tenta cada arquivo candidato até encontrar um com uma função válida
    for (const filePath of candidateFiles) {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
      });

      // Ignora diretórios ou tipos inesperados
      if (Array.isArray(fileData) || fileData.type !== 'file') continue;

      const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const functions = extractFunctions(fileContent);

      if (functions.length === 0) continue;

      // Pega apenas a primeira função encontrada e converte para HTML
      const filename = filePath.split('/').pop()!;
      const html = await codeToHtml(functions[0], {
        lang: 'typescript',
        theme: 'github-dark',
      });

      return { repo: `${owner}/${repo}`, filename, html };
    }

    return null; // Nenhum arquivo útil encontrado neste repositório
  } catch (err) {
    console.warn(`[github.ts] Ignorando ${owner}/${repo}:`, err);
    return null;
  }
}

/**
 * Busca snippets de código de todos os repositórios listados em paralelo.
 * Repositórios que falharem ou não tiverem snippets válidos são ignorados.
 */
export async function fetchSnippets(): Promise<Snippet[]> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const results = await Promise.allSettled(
    REPOS.map(({ owner, repo }) => fetchSnippetForRepo(octokit, owner, repo)),
  );

  // Descarta promessas rejeitadas e resultados nulos
  return results
    .filter(
      (result): result is PromiseFulfilledResult<Snippet> =>
        result.status === 'fulfilled' && result.value !== null,
    )
    .map((result) => result.value);
}
