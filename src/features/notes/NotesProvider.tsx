import React, { useMemo, useState, useCallback } from "react";
import { NotesContext } from "./notes.context";
import { demoNotes } from "./model/demoNotes";
import type { Note, WorkspaceMode } from "./model/types";

type Props = {
  children: React.ReactNode;
};

export function NotesProvider({ children }: Props) {
  const [notes, setNotes] = useState<Note[]>(() => demoNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() =>
    demoNotes.length > 0 ? demoNotes[0].id : null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<WorkspaceMode>("view");

  const selectedNote = useMemo(() => {
    if (!selectedNoteId) return null;
    return notes.find((n) => n.id === selectedNoteId) ?? null;
  }, [notes, selectedNoteId]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;

    return notes.filter((n) => n.content.toLowerCase().includes(q));
  }, [notes, searchQuery]);

  const selectNote = useCallback((id: string) => {
    setSelectedNoteId(id);
    setMode("view");
  }, []);

  const updateNoteContent = useCallback((id: string, content: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, content, updatedAt: Date.now() } : n,
      ),
    );
  }, []);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setMode("view");
      setSelectedNoteId((prevSelected) => {
        if (prevSelected !== id) return prevSelected;
        const remaining = notes.filter((n) => n.id !== id);
        return remaining.length ? remaining[0].id : null;
      });
    },
    [notes],
  );

  const value = useMemo(
    () => ({
      notes,
      filteredNotes,
      selectedNoteId,
      selectedNote,
      searchQuery,
      mode,
      setSearchQuery,
      selectNote,
      setMode,
      updateNoteContent,
      deleteNote,
    }),
    [
      notes,
      filteredNotes,
      selectedNoteId,
      selectedNote,
      searchQuery,
      mode,
      selectNote,
      updateNoteContent,
      deleteNote,
    ],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
