// A browser-sized take on the Wi-Fi QoE health score: turn a handful of
// round-trip timings into per-dimension scores and one weighted total.

/** @typedef {{ latencyMs: number | null, jitterMs: number | null, lossPct: number, downlinkMbps?: number | null }} Metrics */
/** @typedef {{ name: string, score: number, weight: number, reading: string }} Dimension */

/** @param {(number | null)[]} samples round-trip times in ms; null for a failed probe */
export function summarize(samples) {
  const ok = /** @type {number[]} */ (samples.filter((s) => s !== null));
  const lossPct = samples.length ? Math.round((100 * (samples.length - ok.length)) / samples.length) : 100;
  if (!ok.length) return { latencyMs: null, jitterMs: null, lossPct };
  const sorted = [...ok].sort((a, b) => a - b);
  const mid = sorted.length / 2;
  const latencyMs = sorted.length % 2 ? sorted[Math.floor(mid)] : (sorted[mid - 1] + sorted[mid]) / 2;
  const diffs = ok.slice(1).map((v, i) => Math.abs(v - ok[i]));
  const jitterMs = diffs.length ? diffs.reduce((a, b) => a + b, 0) / diffs.length : 0;
  return { latencyMs, jitterMs, lossPct };
}

/** Linear ramp from 100 at `best` to 0 at `worst`, clamped. */
function ramp(/** @type {number} */ value, /** @type {number} */ best, /** @type {number} */ worst) {
  const t = (value - best) / (worst - best);
  return Math.round(100 * Math.min(1, Math.max(0, 1 - t)));
}

/** @param {Metrics} m @returns {{ total: number, dimensions: Dimension[] }} */
export function scoreConnection(m) {
  /** @type {Dimension[]} */
  const dimensions = [
    {
      name: 'Responsiveness',
      weight: 0.4,
      score: m.latencyMs === null ? 0 : ramp(m.latencyMs, 30, 400),
      reading: m.latencyMs === null ? 'no reply' : `${Math.round(m.latencyMs)} ms median`,
    },
    {
      name: 'Stability',
      weight: 0.25,
      score: m.jitterMs === null ? 0 : ramp(m.jitterMs, 5, 120),
      reading: m.jitterMs === null ? 'no reply' : `${Math.round(m.jitterMs)} ms jitter`,
    },
    { name: 'Reliability', weight: 0.2, score: ramp(m.lossPct, 0, 30), reading: `${m.lossPct}% lost` },
  ];
  if (m.downlinkMbps != null) {
    // Throughput is scored on a log scale: 1 Mbps -> 0, 100 Mbps -> 100.
    const score = Math.round(100 * Math.min(1, Math.max(0, Math.log10(m.downlinkMbps) / 2)));
    dimensions.push({ name: 'Throughput', weight: 0.15, score, reading: `~${m.downlinkMbps} Mbps` });
  }
  const weight = dimensions.reduce((a, d) => a + d.weight, 0);
  const total = Math.round(dimensions.reduce((a, d) => a + d.score * d.weight, 0) / weight);
  return { total, dimensions };
}
