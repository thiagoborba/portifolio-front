export type TreeLeaf = {
  id: string;
  label: string;
  content: string[];
};

export type TreeNode = {
  id: string;
  label: string;
  children: (TreeNode | TreeLeaf)[];
};

export type HobbyItem = { id: string; label: string };

// ─── Personal ────────────────────────────────────────────────────────────────

export const personalTree: TreeNode[] = [
  {
    id: 'personal-info',
    label: 'personal-info',
    children: [
      {
        id: 'bio',
        label: 'bio',
        children: [
          {
            id: 'bio-ts',
            label: 'bio.ts',
            content: [
              "const bio = {",
              "  name: 'Thiago Bergenthal de Borba',",
              "  role: 'Senior Front-end Developer',",
              "  experience: '~8 years (since 2018)',",
              "  location: 'Gravataí, RS, Brazil',",
              "  languages: ['Portuguese (native)', 'English (intermediate)'],",
              "  contact: 'thiagoborbadev@gmail.com',",
              "};",
            ],
          },
        ],
      },
      {
        id: 'expertise',
        label: 'expertise',
        children: [
          {
            id: 'expertise-ts',
            label: 'expertise.ts',
            content: [
              "const expertise = [",
              "  'TypeScript',",
              "  'React.js',",
              "  'Next.js',",
              "  'Node.js',",
              "  'React Native',",
              "  'MongoDB',",
              "  'CI/CD',",
              "  'Git',",
              "  'Accessibility',",
              "  'Performance',",
              "];",
            ],
          },
        ],
      },
      {
        id: 'education',
        label: 'education',
        children: [
          {
            id: 'tech-admin',
            label: 'technical-degree.ts',
            content: [
              "const technicalDegree = {",
              "  course: 'Técnico em Administração',",
              "  status: 'concluded',",
              "  year: '2012',",
              "};",
            ],
          },
          {
            id: 'ads',
            label: 'systems-analysis.ts',
            content: [
              "const systemsAnalysis = {",
              "  course: 'Análise e Desenvolvimento de Sistemas',",
              "  institution: 'Unisinos',",
              "  period: '06/2018 – 06/2020',",
              "  status: 'incomplete',",
              "};",
            ],
          },
        ],
      },
      {
        id: 'experience',
        label: 'experience',
        children: [
          {
            id: 'dbc',
            label: 'dbc-company.ts',
            content: [
              "const dbcCompany = {",
              "  company: 'DBC Company / Grupo DPSP',",
              "  role: 'Senior Developer',",
              "  period: '01/2025 – 04/2026',",
              "  project: 'Balcão 2.0 — Drogaria São Paulo',",
              "  stack: ['React.js', 'TypeScript', 'MobX', 'GitLab CI'],",
              "  highlights: [",
              "    'Sustentação de sistema usado em +1.300 farmácias',",
              "    'Testes unitários com React Testing Library',",
              "    'Estratégias de otimização de performance',",
              "  ],",
              "};",
            ],
          },
          {
            id: 'marketdata',
            label: 'marketdata-solutions.ts',
            content: [
              "const marketdata = {",
              "  company: 'Marketdata Solutions Brasil',",
              "  role: 'Development Analyst',",
              "  period: '05/2023 – 01/2025',",
              "  clients: ['Cielo', 'Natura', 'Financial market client'],",
              "  stack: ['React.js', 'TypeScript', 'Next.js', 'ASP.NET', 'AngularJS'],",
              "  highlights: [",
              "    'Plataforma web de controle de taxas e promoções (Cielo)',",
              "    'Projetos em ASP.NET e AngularJS para Natura',",
              "    'Projeto Next.js para cliente do mercado financeiro',",
              "  ],",
              "};",
            ],
          },
          {
            id: 'iteris',
            label: 'iteris.ts',
            content: [
              "const iteris = {",
              "  company: 'Iteris Consultoria e Software',",
              "  role: 'Software Engineer',",
              "  period: '08/2022 – 05/2023',",
              "  project: 'Plataforma digital Nutrien — squad Solicitação de Crédito',",
              "  stack: ['React', 'TypeScript', 'Apollo GraphQL', 'React Hook Form', 'i18next'],",
              "  highlights: [",
              "    'Criação de fluxos de telas e formulários complexos',",
              "    'Arquitetura monorepo',",
              "    'Internacionalização com i18next',",
              "  ],",
              "};",
            ],
          },
          {
            id: 'madeiramadeira',
            label: 'madeiramadeira.ts',
            content: [
              "const madeiraMadeira = {",
              "  company: 'MadeiraMadeira Comércio Eletrônico',",
              "  role: 'Mid-level Systems Analyst',",
              "  period: '03/2022 – 08/2022',",
              "  stack: ['Micro front-ends', 'Hotjar'],",
              "  highlights: [",
              "    'Migração de sistema legado para micro front-ends',",
              "    'Supervisão de desenvolvedores júnior',",
              "    'Análise de comportamento de usuário com Hotjar',",
              "  ],",
              "};",
            ],
          },
          {
            id: 'softdesign',
            label: 'softdesign.ts',
            content: [
              "const softdesign = {",
              "  company: 'Softdesign Consultoria e Sistemas',",
              "  role: 'Mid-level Front-end Developer',",
              "  period: '12/2019 – 03/2022',",
              "  project: 'Novo core digital do Sicredi',",
              "  stack: ['React', 'Micro front-ends', 'Salesforce CRM', 'Scrum', 'Design System'],",
              "  highlights: [",
              "    'Desenvolvimento de telas para atendentes de agência',",
              "    'Arquitetura de micro front-ends em grande escala',",
              "    'Integração com Salesforce CRM',",
              "  ],",
              "};",
            ],
          },
          {
            id: 'sequor',
            label: 'sequor.ts',
            content: [
              "const sequor = {",
              "  company: 'Sequor Sistemas para Automação Industrial',",
              "  role: 'Junior Developer',",
              "  period: '06/2018 – 12/2019',",
              "  stack: ['React.js', 'React Native', 'Node.js', 'MongoDB', 'REST APIs'],",
              "  highlights: [",
              "    'Desenvolvimento de APIs REST',",
              "    'Frontend responsivo com React.js',",
              "    'App mobile com React Native',",
              "  ],",
              "};",
            ],
          },
        ],
      },
    ],
  },
];

// ─── Hobbies ─────────────────────────────────────────────────────────────────

export const hobbiesTree: TreeNode[] = [
  {
    id: 'hobbies',
    label: 'hobbies',
    children: [
      {
        id: 'photography',
        label: 'photography',
        children: [
          {
            id: 'photography-ts',
            label: 'photography.ts',
            content: [
              "const photography = {",
              "  level: 'hobbyist',",
              "  gear: 'Sony A7III',",
              "  subjects: [",
              "    'landscape',",
              "    'street',",
              "    'portrait',",
              "  ],",
              "};",
            ],
          },
        ],
      },
      {
        id: 'music',
        label: 'music',
        children: [
          {
            id: 'music-ts',
            label: 'music.ts',
            content: [
              "const music = {",
              "  instruments: ['guitar', 'piano'],",
              "  genres: ['rock', 'jazz', 'classical'],",
              "  level: 'intermediate',",
              "};",
            ],
          },
        ],
      },
      {
        id: 'gaming',
        label: 'gaming',
        children: [
          {
            id: 'gaming-ts',
            label: 'gaming.ts',
            content: [
              "const gaming = {",
              "  platforms: ['PC', 'PS5'],",
              "  genres: ['RPG', 'FPS', 'strategy'],",
              "  favoriteGame: 'The Witcher 3',",
              "};",
            ],
          },
        ],
      },
      {
        id: 'traveling',
        label: 'traveling',
        children: [
          {
            id: 'traveling-ts',
            label: 'traveling.ts',
            content: [
              "const traveling = {",
              "  visited: ['Argentina', 'USA', 'Portugal'],",
              "  dream: 'Japan',",
              "  style: 'backpacker',",
              "};",
            ],
          },
        ],
      },
    ],
  },
];

// ─── Code Snippets ────────────────────────────────────────────────────────────

export const codeTree: TreeNode[] = [
  {
    id: 'code-snippets',
    label: 'code-snippets',
    children: [
      {
        id: 'snippet-01',
        label: 'snippet-01.ts',
        content: [
          "// useDebounce — debounce a reactive value",
          "",
          "function useDebounce<T>(value: T, delay: number): T {",
          "  const [debounced, setDebounced] = useState(value);",
          "",
          "  useEffect(() => {",
          "    const timer = setTimeout(() => {",
          "      setDebounced(value);",
          "    }, delay);",
          "    return () => clearTimeout(timer);",
          "  }, [value, delay]);",
          "",
          "  return debounced;",
          "}",
        ],
      },
      {
        id: 'snippet-02',
        label: 'snippet-02.ts',
        content: [
          "// fetchData — typed fetch with error handling",
          "",
          "async function fetchData<T>(url: string): Promise<T> {",
          "  const response = await fetch(url);",
          "",
          "  if (!response.ok) {",
          "    throw new Error(`HTTP error: ${response.status}`);",
          "  }",
          "",
          "  return response.json() as Promise<T>;",
          "}",
        ],
      },
      {
        id: 'snippet-03',
        label: 'snippet-03.ts',
        content: [
          "// deepClone — deep copy any serialisable value",
          "",
          "function deepClone<T>(obj: T): T {",
          "  return JSON.parse(JSON.stringify(obj));",
          "}",
          "",
          "// usage",
          "const original = { a: 1, b: { c: 2 } };",
          "const clone = deepClone(original);",
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isLeaf(node: TreeNode | TreeLeaf): node is TreeLeaf {
  return !('children' in node);
}

export function getFirstLeaf(nodes: (TreeNode | TreeLeaf)[]): TreeLeaf | null {
  for (const node of nodes) {
    if (isLeaf(node)) return node;
    const found = getFirstLeaf(node.children);
    if (found) return found;
  }
  return null;
}
