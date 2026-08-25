import type { Bucket } from "./entities";

const CLEANUP_INTERVAL_MS = 60_000;

const BUCKETS = new Map<string, Bucket>();

export { CLEANUP_INTERVAL_MS, BUCKETS };
