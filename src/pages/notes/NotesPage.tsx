import { AppShell } from "@mantine/core";
import { NotesSidebar } from "../../widgets/notesSidebar";
import { NoteWorkspace } from "../../widgets/noteWorkspace";

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
