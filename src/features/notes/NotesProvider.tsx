import React, { useEffect, useMemo, useState, useCallback } from "react";
import { NotesContext } from "./notes.context";
import type { Note, WorkspaceMode } from "./model/types";
import { ensureSeedNotes } from "./storage/seedNotes";
import { deleteNoteById, getAllNotes, upsertNote } from "./storage/notesDb";

type Props = {
  children: React.ReactNode;
};

export function NotesProvider({ children }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<WorkspaceMode>("view");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await ensureSeedNotes();
      const loaded = await getAllNotes();

      if (cancelled) return;

      setNotes(loaded);
      setSelectedNoteId(
        (prev) => prev ?? (loaded.length ? loaded[0].id : null),
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

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
    const updatedAt = Date.now();

    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === id ? { ...n, content, updatedAt } : n,
      );

      const updated = next.find((n) => n.id === id);
      if (updated) void upsertNote(updated);

      return next;
    });
  }, []);

  const deleteNote = useCallback((id: string) => {
    setMode("view");

    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);

      setSelectedNoteId((current) => {
        if (current !== id) return current;
        return next.length ? next[0].id : null;
      });

      void deleteNoteById(id);

      return next;
    });
  }, []);

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
