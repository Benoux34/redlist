import type { Mail } from "@/lib/mail/entities";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60;
const RESET_PASSWORD_PATH = "/reset-password";

function resetTokenExpiresAt(now: number): Date {
  return new Date(now + RESET_TOKEN_TTL_MS);
}

function isResetTokenValid(expiresAt: Date | null, now: number): boolean {
  return expiresAt !== null && expiresAt.getTime() > now;
}

function resetPasswordUrl(webOrigin: string, token: string): string {
  const url = new URL(RESET_PASSWORD_PATH, webOrigin);
  url.searchParams.set("token", token);

  return url.toString();
}

function resetPasswordMail(to: string, url: string): Mail {
  return {
    to,
    subject: "Réinitialisation de votre mot de passe",
    text: [
      "Bonjour,",
      "",
      "Vous avez demandé à réinitialiser le mot de passe de votre compte Liste Rouge. Ouvrez ce lien pour en choisir un nouveau :",
      "",
      url,
      "",
      "Ce lien est valable 1 heure et ne peut servir qu'une fois.",
      "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email : votre mot de passe ne change pas.",
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:520px">
<p>Bonjour,</p>
<p>Vous avez demandé à réinitialiser le mot de passe de votre compte Liste Rouge.</p>
<p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#1a1a1a;color:#ffffff;text-decoration:none">Choisir un nouveau mot de passe</a></p>
<p style="font-size:13px;color:#666666">Ce lien est valable 1 heure et ne peut servir qu'une fois. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email : votre mot de passe ne change pas.</p>
</div>`,
  };
}

export {
  RESET_TOKEN_TTL_MS,
  resetTokenExpiresAt,
  isResetTokenValid,
  resetPasswordUrl,
  resetPasswordMail,
};
