import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "@/context/AuthProvider";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Account from "@/pages/account";
import RedList from "@/pages/home";
import Species from "@/pages/species";
import PresumedExtinct from "@/pages/presumed-extinct";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* MAIN */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<RedList />} />
            <Route path="/red-list" element={<Navigate to="/" replace />} />
            <Route path="/presumed-extinct" element={<PresumedExtinct />} />
            <Route path="/species/:assessmentId" element={<Species />} />
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
