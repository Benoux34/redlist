import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-paper-muted)] selection:text-[var(--color-ink)]">
      <Header />
      <main className="flex flex-1 flex-col overflow-x-clip">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 md:px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { AppLayout };
