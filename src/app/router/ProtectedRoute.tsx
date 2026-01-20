import { Navigate } from "react-router-dom";
import { paths } from "./paths";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const isAuthed = true;

  if (!isAuthed) {
    return <Navigate to={paths.login} replace />;
  }

  return children;
}
