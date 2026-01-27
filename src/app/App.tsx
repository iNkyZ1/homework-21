import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "./providers/router/paths";
import { ProtectedRoute } from "./providers/router/ProtectedRoute";
import { LoginPage } from "../pages/login/LoginPage";
import { NotesPage } from "../pages/notes/NotesPage";
import { NotesProvider } from "../entities/note/NotesProvider";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.login} replace />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route
        path={paths.notes}
        element={
          <ProtectedRoute>
            <NotesProvider>
              <NotesPage />
            </NotesProvider>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={paths.login} replace />} />
    </Routes>
  );
}
