const USER_AGENT_HEADER = "user-agent";

const REGISTER_LIMIT = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
  keyPrefix: "register",
} as const;

const LOGIN_LIMIT = {
  limit: 10,
  windowMs: 15 * 60 * 1000,
  keyPrefix: "login",
} as const;

export { USER_AGENT_HEADER, REGISTER_LIMIT, LOGIN_LIMIT };
