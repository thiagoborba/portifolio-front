const FILE_ICON_MAP: Record<string, string> = {
  ts: '/icons/material/typescript.svg',
};

const FOLDER_ICON_MAP: Record<string, [string, string]> = {
  'personal-info': ['/icons/material/folder-home.svg', '/icons/material/folder-home-open.svg'],
  bio: ['/icons/material/folder-home.svg', '/icons/material/folder-home-open.svg'],
  expertise: ['/icons/material/folder-vscode.svg', '/icons/material/folder-vscode-open.svg'],
  education: ['/icons/material/folder-docs.svg', '/icons/material/folder-docs-open.svg'],
  experience: ['/icons/material/folder-job.svg', '/icons/material/folder-job-open.svg'],
  hobbies: ['/icons/material/folder-gamemaker.svg', '/icons/material/folder-gamemaker-open.svg'],
  photography: ['/icons/material/folder-images.svg', '/icons/material/folder-images-open.svg'],
  music: ['/icons/material/folder-audio.svg', '/icons/material/folder-audio-open.svg'],
  gaming: ['/icons/material/folder-gamemaker.svg', '/icons/material/folder-gamemaker-open.svg'],
  traveling: ['/icons/material/folder-public.svg', '/icons/material/folder-public-open.svg'],
  'code-snippets': ['/icons/material/folder-snippet.svg', '/icons/material/folder-snippet-open.svg'],
};

const FALLBACK_FILE = '/icons/material/typescript.svg';
const FALLBACK_FOLDER: [string, string] = [
  '/icons/material/folder.svg',
  '/icons/material/folder-open.svg',
];

export function getFileIcon(label: string): string {
  const ext = label.split('.').pop() ?? '';
  return FILE_ICON_MAP[ext] ?? FALLBACK_FILE;
}

export function getFolderIcon(label: string, open: boolean): string {
  const [closed, opened] = FOLDER_ICON_MAP[label] ?? FALLBACK_FOLDER;
  return open ? opened : closed;
}
