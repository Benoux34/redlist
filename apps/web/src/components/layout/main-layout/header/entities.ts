type NavGroup = Readonly<{
  label: string;
  match: readonly string[];
  links: readonly Readonly<{ to: string; label: string }>[];
}>;

export type { NavGroup };
