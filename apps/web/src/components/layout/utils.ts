const navLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return isActive
    ? "text-ink underline underline-offset-4 decoration-status-cr"
    : "text-ink-muted transition-colors hover:text-ink";
};

export { navLinkClass };
