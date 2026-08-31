import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "@/context/AuthProvider";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { ScrollToTop } from "@/components/scroll-to-top/ScrollToTop";
import { AppLayout } from "@/components/layout/main-layout/AppLayout";
import { AuthLayout } from "@/components/layout/auth-layout/AuthLayout";
import { Loading } from "@/components/loading/Loading";

const Login = lazy(() => import("@/pages/auth/login/login"));
const Register = lazy(() => import("@/pages/auth/register/register"));
const Account = lazy(() => import("@/pages/account"));
const RedList = lazy(() => import("@/pages/home"));
const ThreatenedSpecies = lazy(() => import("@/pages/threatened-species"));
const Species = lazy(() => import("@/pages/species"));
const PresumedExtinct = lazy(() => import("@/pages/presumed-extinct"));
const Alphabet = lazy(() => import("@/pages/alphabet"));
const France = lazy(() => import("@/pages/france"));
const Methodology = lazy(() => import("@/pages/methodology"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Suspense fallback={<Loading label="Chargement…" />}>
          <Routes>
            {/* AUTH */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* MAIN */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<RedList />} />
              <Route
                path="/threatened-species"
                element={<ThreatenedSpecies />}
              />
              <Route
                path="/red-list"
                element={<Navigate to="/threatened-species" replace />}
              />
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export { App };
