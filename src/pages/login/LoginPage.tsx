import { Button, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { paths } from "../../app/router/paths";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <Stack align="center" justify="center" h="100vh" px="md">
      <Paper withBorder p="lg" w={360}>
        <Stack>
          <Title order={3}>Sign in</Title>
          <TextInput label="Username" placeholder="Enter username" />
          <TextInput
            label="Password"
            placeholder="Enter password"
            type="password"
          />
          <Button onClick={() => navigate(paths.notes)}>Sign in (stub)</Button>
          <Text size="sm" c="dimmed">
            Auth is stubbed. Real logic will be added in Step 2.
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
