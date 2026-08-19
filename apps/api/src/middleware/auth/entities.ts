type SessionUserContext = {
  id: string;
  pseudo: string;
  email: string;
  createdAt: Date;
};

type AppEnv = {
  Variables: {
    user: SessionUserContext | null;
  };
};

export type { AppEnv, SessionUserContext };
