import type { Note } from "./types";

export const demoNotes: Note[] = [
  {
    id: "1",
    content: `# React Notes

React — JavaScript-библиотека для создания пользовательских интерфейсов.

\`\`\`ts
type Note = { id: string; content: string }
\`\`\`
`,
    updatedAt: Date.now(),
  },
  {
    id: "2",
    content: `# Markdown checklist

- [ ] Learn Context API
- [ ] Add autosave
- [ ] Add PWA offline
`,
    updatedAt: Date.now() - 1000 * 60 * 60,
  },
];
