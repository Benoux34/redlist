type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

// window.umami is absent in development, and on every visit where a blocker
// drops the script. Guarding once here keeps that check out of each call site,
// where forgetting it would throw in the middle of a render.
function track(event: string, data?: EventData): void {
  window.umami?.track(event, data);
}

export { track };
