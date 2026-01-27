import { createContext } from "react";
import type { Note, WorkspaceMode } from "./model/types";

export type NotesContextValue = {
  notes: Note[];
  filteredNotes: Note[];
  selectedNoteId: string | null;
  selectedNote: Note | null;

  searchQuery: string;
  mode: WorkspaceMode;

  setSearchQuery: (value: string) => void;
  selectNote: (id: string) => void;

  setMode: (mode: WorkspaceMode) => void;

  updateNoteContent: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
};

export const NotesContext = createContext<NotesContextValue | null>(null);
