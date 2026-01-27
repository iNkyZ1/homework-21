import { Button, Group, Stack, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useNotes } from "../../../entities/note";
import { useDebouncedValue } from "../../../shared/lib/hooks";
import { ConfirmModal } from "../../../shared/ui";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownView } from "./MarkdownView";

export function NoteWorkspace() {
  const { selectedNote, mode, setMode, updateNoteContent, deleteNote } =
    useNotes();

  const noteId = selectedNote?.id ?? null;

  const [draftById, setDraftById] = useState<Record<string, string>>({});
  const [deleteOpened, setDeleteOpened] = useState(false);

  const draft = useMemo(() => {
    if (!noteId) return "";
    return draftById[noteId] ?? selectedNote?.content ?? "";
  }, [draftById, noteId, selectedNote?.content]);

  const setDraft = (value: string) => {
    if (!noteId) return;
    setDraftById((prev) => ({ ...prev, [noteId]: value }));
  };

  const debouncedDraft = useDebouncedValue(draft, 500);

  const handleDeleteConfirm = () => {
    setDeleteOpened(false);
    if (!noteId) return;
    deleteNote(noteId);
  };

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
            <>
              <Button
                color="red"
                variant="light"
                onClick={() => setDeleteOpened(true)}
              >
                Delete
              </Button>

              <Button variant="light" onClick={() => setMode("edit")}>
                Edit
              </Button>
            </>
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
      <ConfirmModal
        opened={deleteOpened}
        title="Delete note?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDanger
        onCancel={() => setDeleteOpened(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Stack>
  );
}
