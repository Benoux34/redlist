import type { SessionUser } from "@app/contracts";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthStatus } from "@/context/entities";
import { AuthContext } from "@/context/context";
import {
  deleteAccountRequest,
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
} from "@/api/auth";

type Props = Readonly<{
  children: ReactNode;
}>;

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    meRequest()
      .then(({ user: currentUser }) => {
        if (cancelled) return;

        setUser(currentUser);
        setStatus("authenticated");
      })
      .catch(() => {
        if (cancelled) return;

        setUser(null);
        setStatus("anonymous");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user: loggedUser } = await loginRequest({ email, password });

    setUser(loggedUser);
    setStatus("authenticated");
  }, []);

  const register = useCallback(
    async (pseudo: string, email: string, password: string) => {
      const { user: createdUser } = await registerRequest({
        pseudo,
        email,
        password,
      });

      setUser(createdUser);
      setStatus("authenticated");
    },
    [],
  );

  const logout = useCallback(async () => {
    await logoutRequest();

    setUser(null);
    setStatus("anonymous");
  }, []);

  const deleteAccount = useCallback(async () => {
    await deleteAccountRequest();

    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(
    () => ({ user, status, login, register, logout, deleteAccount }),
    [user, status, login, register, logout, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
