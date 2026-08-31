import type { Bucket } from "./entities";

const CLEANUP_INTERVAL_MS = 60_000;
const REAL_IP_HEADER = "x-real-ip";
const UNKNOWN_IP = "unknown";

const BUCKETS = new Map<string, Bucket>();

function resolveClientIp(input: {
  trustProxy: boolean;
  realIpHeader: string | undefined;
  remoteAddress: string | undefined;
}): string {
  if (input.trustProxy) {
    const realIp = input.realIpHeader?.trim();
    if (realIp !== undefined && realIp !== "") return realIp;
  }

  const remote = input.remoteAddress?.trim();

  return remote === undefined || remote === "" ? UNKNOWN_IP : remote;
}

export {
  CLEANUP_INTERVAL_MS,
  REAL_IP_HEADER,
  UNKNOWN_IP,
  BUCKETS,
  resolveClientIp,
};
