import { Button, Group, Stack, Text } from "@mantine/core";
import { useNotes } from "../../features/notes/useNotes";
import { MarkdownView } from "./MarkdownView";

export function Workspace() {
  const { selectedNote, mode, setMode } = useNotes();

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
        <Text fw={600}>Note</Text>

        <Group>
          <Button
            variant="light"
            onClick={() => setMode("edit")}
            disabled={mode === "edit"}
          >
            Edit
          </Button>
        </Group>
      </Group>

      <MarkdownView content={selectedNote.content} />
    </Stack>
  );
}
