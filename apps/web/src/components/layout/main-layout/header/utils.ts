import type { NavGroup } from "./entities";

const navLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return isActive
    ? "text-ink underline underline-offset-4 decoration-status-cr"
    : "text-ink-muted transition-colors hover:text-ink";
};

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return isActive
    ? "block px-6 py-3.5 text-sm text-[var(--color-ink)] underline underline-offset-4 decoration-status-cr md:px-4"
    : "block px-6 py-3.5 text-sm text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-paper-muted)]/40 hover:text-[var(--color-ink)] md:px-4";
};

const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "Explorer",
    match: [
      "/threatened-species",
      "/presumed-extinct",
      "/especes",
      "/species",
      "/notre-planete",
      "/pays",
    ],
    links: [
      { to: "/threatened-species", label: "Espèces menacées" },
      { to: "/presumed-extinct", label: "Présumées éteintes" },
      { to: "/especes/a", label: "Index A–Z" },
      { to: "/notre-planete", label: "Notre planète" },
      { to: "/pays/fr", label: "En France" },
    ],
  },
  {
    label: "Comprendre",
    match: ["/methodology", "/agir"],
    links: [
      { to: "/methodology", label: "Méthodologie" },
      { to: "/agir", label: "Agir" },
    ],
  },
];

function isGroupActive(pathname: string, group: NavGroup): boolean {
  return group.match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export { navLinkClass, mobileNavLinkClass, NAV_GROUPS, isGroupActive };
