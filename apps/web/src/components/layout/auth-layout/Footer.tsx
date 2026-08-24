const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl text-center text-xs text-[var(--color-ink-faint)]">
      <p>© {new Date().getFullYear()} REDLIST • Projet ouvert & indépendant.</p>
    </footer>
  );
};

export { Footer };
