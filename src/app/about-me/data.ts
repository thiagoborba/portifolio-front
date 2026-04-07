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
              "  role: 'front-end developer',",
              "  experience: '5 years',",
              "  location: 'Porto Alegre, Brazil',",
              "  languages: ['Portuguese', 'English'],",
              "};",
            ],
          },
        ],
      },
      {
        id: 'interests',
        label: 'interests',
        children: [
          {
            id: 'interests-ts',
            label: 'interests.ts',
            content: [
              "const interests = [",
              "  'frontend development',",
              "  'open source',",
              "  'design systems',",
              "  'UI/UX',",
              "  'TypeScript',",
              "  'React',",
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
            id: 'high-school',
            label: 'high-school.ts',
            content: [
              "const highSchool = {",
              "  name: 'Escola Estadual XYZ',",
              "  period: '2015 - 2018',",
              "  city: 'Porto Alegre, RS',",
              "};",
            ],
          },
          {
            id: 'university',
            label: 'university.ts',
            content: [
              "const university = {",
              "  name: 'Universidade Federal XYZ',",
              "  degree: 'Computer Science',",
              "  period: '2019 - 2023',",
              "  city: 'Porto Alegre, RS',",
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
