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
const CountryPage = lazy(() => import("@/pages/country"));
const Methodology = lazy(() => import("@/pages/methodology"));
const Atlas = lazy(() => import("@/pages/atlas"));
const Actions = lazy(() => import("@/pages/actions"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LegalNotice = lazy(() => import("@/pages/legal/mentions"));
const Privacy = lazy(() => import("@/pages/legal/confidentialite"));
const Terms = lazy(() => import("@/pages/legal/cgu"));

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
              <Route path="/pays/:code" element={<CountryPage />} />
              <Route
                path="/france"
                element={<Navigate to="/pays/fr" replace />}
              />
              <Route
                path="/pays"
                element={<Navigate to="/pays/fr" replace />}
              />
              <Route path="/presumed-extinct" element={<PresumedExtinct />} />
              <Route
                path="/especes"
                element={<Navigate to="/especes/a" replace />}
              />
              <Route path="/especes/:letter" element={<Alphabet />} />
              <Route path="/species/:assessmentId" element={<Species />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/atlas" element={<Atlas />} />
              <Route path="/agir" element={<Actions />} />
              <Route path="/mentions-legales" element={<LegalNotice />} />
              <Route path="/confidentialite" element={<Privacy />} />
              <Route path="/cgu" element={<Terms />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export { App };
