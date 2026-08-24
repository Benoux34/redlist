import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "@/context/AuthProvider";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AppLayout } from "@/components/layout/main-layout/AppLayout";
import { AuthLayout } from "@/components/layout/auth-layout/AuthLayout";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/register/register";
import Account from "@/pages/account";
import RedList from "@/pages/home";
import Species from "@/pages/species";
import PresumedExtinct from "@/pages/presumed-extinct";
import Alphabet from "./pages/alphabet";
import France from "./pages/france";
import Methodology from "./pages/methodology";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* AUTH */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* MAIN */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<RedList />} />
            <Route path="/red-list" element={<Navigate to="/" replace />} />
            <Route path="/france" element={<France />} />
            <Route path="/presumed-extinct" element={<PresumedExtinct />} />
            <Route
              path="/especes"
              element={<Navigate to="/especes/a" replace />}
            />
            <Route path="/especes/:letter" element={<Alphabet />} />
            <Route path="/species/:assessmentId" element={<Species />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export { App };
