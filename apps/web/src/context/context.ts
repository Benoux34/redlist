import { createContext } from "react";
import type { AuthContextValue } from "./entities";

const AuthContext = createContext<AuthContextValue | null>(null);

export { AuthContext };
