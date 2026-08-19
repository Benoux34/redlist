import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-paper-muted)] selection:text-[var(--color-ink)]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 md:px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { AppLayout };
