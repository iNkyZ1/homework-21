import { AppShell, Text } from "@mantine/core";

export function NotesPage() {
  return (
    <AppShell navbar={{ width: 320, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar p="md">
        <Text fw={600}>Sidebar (stub)</Text>
        <Text size="sm" c="dimmed">
          Search + list will be added later
        </Text>
      </AppShell.Navbar>

      <AppShell.Main>
        <Text fw={600}>Workspace (stub)</Text>
        <Text size="sm" c="dimmed">
          Markdown view/editor will be added later
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
