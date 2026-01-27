import { AppShell } from "@mantine/core";
import { Sidebar } from "../../widgets/notesSidebar/ui/NotesSidebar";
import { Workspace } from "../../components/Workspace/Workspace";

export function NotesPage() {
  return (
    <AppShell navbar={{ width: 320, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Workspace />
      </AppShell.Main>
    </AppShell>
  );
}
