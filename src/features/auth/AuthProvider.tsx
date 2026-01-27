import React, { useCallback, useMemo, useState } from "react";
import {
  getStoredAuth,
  setStoredAuth,
} from "../../shared/lib/storage/authStorage";
import { AuthContext } from "../../shared/model/auth/auth.context";
import type {
  SignInPayload,
  AuthContextValue,
} from "../../shared/model/auth/auth.context";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => getStoredAuth());

  const signIn = useCallback(async ({ username, password }: SignInPayload) => {
    if (!username.trim() || !password.trim()) {
      throw new Error("Username and password are required");
    }
    setIsAuthed(true);
    setStoredAuth(true);
  }, []);

  const signOut = useCallback(() => {
    setIsAuthed(false);
    setStoredAuth(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthed, signIn, signOut }),
    [isAuthed, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
