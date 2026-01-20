import { createContext } from "react";

export type SignInPayload = {
  username: string;
  password: string;
};

export type AuthContextValue = {
  isAuthed: boolean;
  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
