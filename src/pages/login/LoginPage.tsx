import { Button, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../app/router/paths";
import { useAuth } from "../../features/auth/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthed, signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (isAuthed) {
    navigate(paths.notes, { replace: true });
  }

  const handleSubmit = async () => {
    setFormError(null);

    const uOk = Boolean(username.trim());
    const pOk = Boolean(password.trim());

    setUsernameError(uOk ? null : "Required");
    setPasswordError(pOk ? null : "Required");

    if (!uOk || !pOk) return;

    try {
      await signIn({ username, password });
      navigate(paths.notes, { replace: true });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Sign in failed");
    }
  };

  return (
    <Stack align="center" justify="center" h="100vh" px="md">
      <Paper withBorder p="lg" w={360}>
        <Stack>
          <Title order={3}>Sign in</Title>

          <TextInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            error={usernameError}
          />

          <TextInput
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            error={passwordError}
          />

          {formError && (
            <Text size="sm" c="red">
              {formError}
            </Text>
          )}

          <Button onClick={handleSubmit}>Sign in</Button>

          <Text size="sm" c="dimmed">
            Client-only auth: any non-empty credentials are accepted.
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
