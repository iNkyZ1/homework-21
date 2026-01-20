import { Navigate, Route, Routes } from "react-router-dom";
import { paths } from "./router/paths";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { LoginPage } from "../pages/login/LoginPage";
import { NotesPage } from "../pages/notes/NotesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.login} replace />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route
        path={paths.notes}
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={paths.login} replace />} />
    </Routes>
  );
}
