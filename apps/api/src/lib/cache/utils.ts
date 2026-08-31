// Aggregates change only when the ingestion scripts run, which is a manual
// operation measured in weeks. A short TTL is still enough to collapse the
// repeated full-table scans a browsing session produces.
const AGGREGATE_TTL_MS = 5 * 60 * 1000;

export { AGGREGATE_TTL_MS };
