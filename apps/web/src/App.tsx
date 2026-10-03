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
const ForgotPassword = lazy(
  () => import("@/pages/auth/forgot-password/forgot-password"),
);
const OAuthAuthorize = lazy(
  () => import("@/pages/auth/oauth-authorize/oauth-authorize"),
);
const ResetPassword = lazy(
  () => import("@/pages/auth/reset-password/reset-password"),
);
const Account = lazy(() => import("@/pages/main/account"));
const RedList = lazy(() => import("@/pages/main/home"));
const ThreatenedSpecies = lazy(
  () => import("@/pages/main/redlist/threatened-species"),
);
const Species = lazy(() => import("@/pages/main/redlist/species"));
const PresumedExtinct = lazy(
  () => import("@/pages/main/redlist/presumed-extinct"),
);
const Alphabet = lazy(() => import("@/pages/main/redlist/alphabet"));
const CountryPage = lazy(() => import("@/pages/main/redlist/country"));
const Methodology = lazy(() => import("@/pages/main/education/methodology"));
const Planet = lazy(() => import("@/pages/main/redlist/planet"));
const Actions = lazy(() => import("@/pages/main/education/actions"));
const NotFound = lazy(() => import("@/pages/main/not-found"));
const LegalNotice = lazy(() => import("@/pages/main/legal/mentions"));
const Privacy = lazy(() => import("@/pages/main/legal/confidentialite"));
const Terms = lazy(() => import("@/pages/main/legal/cgu"));

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
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/oauth/authorize" element={<OAuthAuthorize />} />
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
              <Route path="/notre-planete" element={<Planet />} />
              <Route
                path="/atlas"
                element={<Navigate to="/notre-planete" replace />}
              />
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
