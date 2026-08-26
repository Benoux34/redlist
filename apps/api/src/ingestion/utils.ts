function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatEta(remaining: number, ratePerMs: number): string {
  if (ratePerMs <= 0) return "unknown";

  const minutes = Math.round(remaining / ratePerMs / 60_000);
  return minutes < 60 ? `${minutes}m` : `${Math.round(minutes / 60)}h`;
}

export { sleep, formatEta };
