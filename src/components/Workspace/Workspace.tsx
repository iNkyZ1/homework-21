import { Button, Group, Stack, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useNotes } from "../../features/notes/useNotes";
import { useDebouncedValue } from "../../shared/hooks/useDebouncedValue";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownView } from "./MarkdownView";

export function Workspace() {
  const { selectedNote, mode, setMode, updateNoteContent } = useNotes();

  const noteId = selectedNote?.id ?? null;

  const [draftById, setDraftById] = useState<Record<string, string>>({});

  const draft = useMemo(() => {
    if (!noteId) return "";
    return draftById[noteId] ?? selectedNote?.content ?? "";
  }, [draftById, noteId, selectedNote?.content]);

  const setDraft = (value: string) => {
    if (!noteId) return;
    setDraftById((prev) => ({ ...prev, [noteId]: value }));
  };

  const debouncedDraft = useDebouncedValue(draft, 500);

  useEffect(() => {
    if (!noteId) return;
    if (mode !== "edit") return;

    if (debouncedDraft === (selectedNote?.content ?? "")) return;

    updateNoteContent(noteId, debouncedDraft);
  }, [debouncedDraft, mode, noteId, selectedNote?.content, updateNoteContent]);

  const headerTitle = mode === "edit" ? "Editing" : "Note";

  if (!selectedNote) {
    return (
      <Stack>
        <Text fw={600}>Workspace</Text>
        <Text c="dimmed">Select a note from the sidebar</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Text fw={600}>{headerTitle}</Text>

        <Group>
          {mode === "view" ? (
            <Button variant="light" onClick={() => setMode("edit")}>
              Edit
            </Button>
          ) : (
            <Button variant="light" onClick={() => setMode("view")}>
              View
            </Button>
          )}
        </Group>
      </Group>

      {mode === "view" ? (
        <MarkdownView content={selectedNote.content} />
      ) : (
        <MarkdownEditor value={draft} onChange={setDraft} />
      )}
    </Stack>
  );
}
