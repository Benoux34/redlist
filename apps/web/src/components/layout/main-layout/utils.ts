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

const NAV_LINKS = [
  { to: "/threatened-species", label: "Espèces menacées" },
  { to: "/france", label: "En France" },
  { to: "/presumed-extinct", label: "Présumées éteintes" },
] as const;

export { navLinkClass, mobileNavLinkClass, NAV_LINKS };
