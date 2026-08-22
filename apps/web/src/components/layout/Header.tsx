import { Link, NavLink } from "react-router";
import { navLinkClass } from "./utils";

const Header = () => {
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

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={navLinkClass}>
            Espèces menacées
          </NavLink>
          <NavLink to="/presumed-extinct" className={navLinkClass}>
            Présumées éteintes
          </NavLink>
          <NavLink to="/account" className={navLinkClass}>
            Compte
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export { Header };
