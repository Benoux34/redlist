type Mail = Readonly<{
  to: string;
  subject: string;
  text: string;
  html: string;
}>;

export type { Mail };
