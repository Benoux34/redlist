import type { SessionUser } from "@app/contracts";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  user: SessionUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  register: (pseudo: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

export type { AuthContextValue, AuthStatus };
