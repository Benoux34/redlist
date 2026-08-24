import { AppError } from "./errors";

function currentUserId(c: { get: (key: "user") => unknown }): string {
  const user = c.get("user");

  if (
    typeof user !== "object" ||
    user === null ||
    !("id" in user) ||
    typeof user.id !== "string"
  ) {
    throw new AppError("UNAUTHENTICATED");
  }

  return user.id;
}

export { currentUserId };
