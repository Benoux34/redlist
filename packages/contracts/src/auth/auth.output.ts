import { z } from "zod";

const publicUser = z.strictObject({
  id: z.uuid(),
  pseudo: z.string(),
  createdAt: z.iso.datetime(),
});

const sessionUser = publicUser.extend({
  email: z.email(),
});

const authResponse = z.strictObject({
  user: sessionUser,
});

const errorResponse = z.strictObject({
  code: z.string(),
});

export { publicUser, sessionUser, authResponse, errorResponse };
