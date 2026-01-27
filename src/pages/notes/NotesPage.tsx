import { AppShell } from "@mantine/core";
import { NotesSidebar } from "../../widgets/notesSidebar/ui/NotesSidebar";
import { NoteWorkspace } from "../../widgets/noteWorkspace/ui/NoteWorkspace";

export function NotesPage() {
  return (
    <AppShell navbar={{ width: 320, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar p="md">
        <NotesSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <NoteWorkspace />
      </AppShell.Main>
    </AppShell>
  );
}
