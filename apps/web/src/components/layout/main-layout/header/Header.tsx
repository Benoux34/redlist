import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import {
  NAV_GROUPS,
  isGroupActive,
  mobileNavLinkClass,
  navLinkClass,
} from "./utils";
import { collapsibleClass } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/useAuth";

const Header = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedAt(null);
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
            viewTransition
            to="/"
            className="group flex items-baseline transition-opacity hover:opacity-80"
          >
            <p className="pr-1 pt-1 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              REDLIST
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-status-cr)] transition-transform group-hover:scale-125" />
          </Link>
        </div>

        <div className="hidden items-center gap-6 text-sm lg:flex">
          <NavigationMenu align="end">
            <NavigationMenuList className="gap-6">
              {NAV_GROUPS.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger
                    className={
                      isGroupActive(pathname, group)
                        ? "text-[var(--color-ink)] underline decoration-status-cr underline-offset-4"
                        : undefined
                    }
                  >
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-52">
                      {group.links.map((link) => (
                        <li key={link.to}>
                          <NavigationMenuLink
                            closeOnClick
                            active={pathname === link.to}
                            render={<Link viewTransition to={link.to} />}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <NavLink viewTransition to={accountTo} className={navLinkClass}>
            {accountLabel}
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpenedAt(isOpen ? null : pathname)}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="-mr-2 inline-flex cursor-pointer items-center justify-center p-2 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav
        id="main-menu"
        inert={!isOpen}
        className={`${collapsibleClass(isOpen)} lg:hidden`}
      >
        <div className="min-h-0 overflow-hidden border-t border-[var(--color-paper-border)]">
          <div className="mx-auto max-w-6xl divide-y divide-[var(--color-paper-border)]">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="pb-2">
                <p className="px-6 pt-4 pb-1 text-xs font-medium uppercase tracking-wider text-[var(--color-ink-faint)] md:px-4">
                  {group.label}
                </p>
                {group.links.map((link) => (
                  <NavLink
                    viewTransition
                    key={link.to}
                    to={link.to}
                    className={mobileNavLinkClass}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <NavLink
              viewTransition
              to={accountTo}
              className={mobileNavLinkClass}
            >
              {accountLabel}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
