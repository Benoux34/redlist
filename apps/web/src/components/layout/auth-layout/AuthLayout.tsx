import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[var(--color-paper)] p-6 text-[var(--color-ink)]">
      <Header />
      <main className="my-10 flex w-full justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { AuthLayout };
