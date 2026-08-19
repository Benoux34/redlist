import { useContext } from "react";
import type { AuthContextValue } from "./entities";
import { AuthContext } from "./context";

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}

export { useAuth };
