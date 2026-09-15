import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, mobileNavLinkClass, navLinkClass } from "./utils";
import { collapsibleClass } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";

const Header = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const accountTo = user ? "/account" : "/login";
  const accountLabel = user ? user.pseudo : "Connectez-vous";

  return (
    <header className="w-full border-b border-[var(--color-paper-border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="group flex items-baseline transition-opacity hover:opacity-80"
          >
            <p className="pr-1 pt-1 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              REDLIST
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-cr)] transition-transform group-hover:scale-125" />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to={accountTo} className={navLinkClass}>
            {accountLabel}
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="-mr-2 inline-flex cursor-pointer items-center justify-center p-2 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav
        id="main-menu"
        inert={!isOpen}
        className={`${collapsibleClass(isOpen)} md:hidden`}
      >
        <div className="min-h-0 overflow-hidden border-t border-[var(--color-paper-border)]">
          <div className="mx-auto max-w-6xl divide-y divide-[var(--color-paper-border)]">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to={accountTo} className={mobileNavLinkClass}>
              {accountLabel}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
