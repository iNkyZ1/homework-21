import { Navigate } from "react-router-dom";
import { paths } from "./paths";
import { useAuth } from "../../../features/auth/useAuth";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <Navigate to={paths.login} replace />;
  }

  return children;
}
