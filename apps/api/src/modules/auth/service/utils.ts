const UNIQUE_CONSTRAINT_ERROR = "P2002";

const USER_SELECT = {
  id: true,
  pseudo: true,
  email: true,
  createdAt: true,
} as const;

export { UNIQUE_CONSTRAINT_ERROR, USER_SELECT };
