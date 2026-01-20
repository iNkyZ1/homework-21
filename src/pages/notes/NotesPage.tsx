import { AppShell, Text } from "@mantine/core";
import { useNotes } from "../../features/notes/useNotes";

export function NotesPage() {
  const { filteredNotes, selectedNote } = useNotes();

  return (
    <AppShell navbar={{ width: 320, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar p="md">
        <Text fw={600}>Sidebar (stub)</Text>
        <Text size="sm" c="dimmed">
          Notes: {filteredNotes.length}
        </Text>
      </AppShell.Navbar>

      <AppShell.Main>
        <Text fw={600}>Workspace (stub)</Text>
        <Text size="sm" c="dimmed">
          Selected: {selectedNote ? selectedNote.id : "none"}
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
