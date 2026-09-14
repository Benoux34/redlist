type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

function track(event: string, data?: EventData): void {
  window.umami?.track(event, data);
}

export { track };
