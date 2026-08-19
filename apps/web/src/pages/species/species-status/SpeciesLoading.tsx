const SpeciesLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-44 bg-[var(--color-paper-muted)]" />
      <div className="border border-[var(--color-paper-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="aspect-[4/3] bg-[var(--color-paper-muted)] lg:col-span-5" />
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="mb-4 h-5 w-36 bg-[var(--color-paper-muted)]" />
              <div className="mb-3 h-9 w-3/4 bg-[var(--color-paper-muted)]" />
              <div className="mb-4 h-6 w-1/2 bg-[var(--color-paper-muted)]" />
              <div className="h-16 w-full bg-[var(--color-paper-muted)]" />
            </div>
            <div className="mt-8 flex gap-3">
              <div className="h-8 w-28 bg-[var(--color-paper-muted)]" />
              <div className="h-8 w-28 bg-[var(--color-paper-muted)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SpeciesLoading };
