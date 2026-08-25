import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { isProduction } from "..";

const SESSION_COOKIE_NAME = "session";

function setSessionCookie(c: Context, token: string, expiresAt: Date): void {
  setCookie(c, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax",
    path: "/",
    expires: expiresAt,
  });
}

function getSessionCookie(c: Context): string | undefined {
  return getCookie(c, SESSION_COOKIE_NAME);
}

function clearSessionCookie(c: Context): void {
  deleteCookie(c, SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax",
    path: "/",
  });
}

export { clearSessionCookie, getSessionCookie, setSessionCookie };
