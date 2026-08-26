import { useLocation, Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/context/useAuth";

type Props = Readonly<{
  children: ReactNode;
}>;

function ProtectedRoute({ children }: Props) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "anonymous")
    return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}

export { ProtectedRoute };
