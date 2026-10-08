import { describe, it, expect } from 'vitest';
import { summarize, scoreConnection } from '../js/wifi.js';

describe('summarize', () => {
  it('takes the median latency, mean jitter, and loss from timing samples', () => {
    const s = summarize([20, 30, 25, null, 40]);
    expect(s.latencyMs).toBe(27.5);
    expect(s.jitterMs).toBeCloseTo(10, 5); // |30-20|, |25-30|, |40-25|
    expect(s.lossPct).toBe(20);
  });

  it('reports total loss when nothing came back', () => {
    const s = summarize([null, null]);
    expect(s.lossPct).toBe(100);
    expect(s.latencyMs).toBeNull();
  });
});

describe('scoreConnection', () => {
  const good = { latencyMs: 15, jitterMs: 2, lossPct: 0, downlinkMbps: 200 };
  const bad = { latencyMs: 600, jitterMs: 150, lossPct: 40, downlinkMbps: 0.5 };

  it('keeps every score between 0 and 100', () => {
    for (const m of [good, bad]) {
      const r = scoreConnection(m);
      expect(r.total).toBeGreaterThanOrEqual(0);
      expect(r.total).toBeLessThanOrEqual(100);
      for (const d of r.dimensions) {
        expect(d.score).toBeGreaterThanOrEqual(0);
        expect(d.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it('scores a fast clean link far above a slow lossy one', () => {
    expect(scoreConnection(good).total).toBeGreaterThan(90);
    expect(scoreConnection(bad).total).toBeLessThan(20);
  });

  it('gets worse as latency grows', () => {
    const a = scoreConnection({ ...good, latencyMs: 40 }).total;
    const b = scoreConnection({ ...good, latencyMs: 200 }).total;
    expect(a).toBeGreaterThan(b);
  });

  it('leaves throughput out when the browser cannot report it', () => {
    const r = scoreConnection({ ...good, downlinkMbps: null });
    expect(r.dimensions.map((d) => d.name)).not.toContain('Throughput');
    expect(r.total).toBeGreaterThan(90);
  });
});
