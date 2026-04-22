import React from 'react';
import type { RegionMetrics } from '../../utils/calculations';

interface HeatmapChartProps {
  regions: RegionMetrics[];
}

function carbonColor(intensity: number): string {
  // Map 0–800 gCO₂/kWh to green → yellow → red
  const ratio = Math.min(intensity / 750, 1);
  const r = Math.round(239 * ratio + 34 * (1 - ratio));
  const g = Math.round(71 * ratio + 197 * (1 - ratio));
  const b = Math.round(111 * ratio + 94 * (1 - ratio));
  return `rgb(${r},${g},${b})`;
}

export function HeatmapChart({ regions }: HeatmapChartProps): React.JSX.Element {
  if (regions.length === 0) {
    return (
      <section className="panel">
        <h3>Regional Carbon Intensity</h3>
        <p>No region data available.</p>
      </section>
    );
  }

  const sorted = [...regions].sort((a, b) => b.carbonIntensity - a.carbonIntensity);
  const maxIntensity = Math.max(...sorted.map((r) => r.carbonIntensity));
  const maxEnergy = Math.max(...sorted.map((r) => r.energyKwhPerDay));

  return (
    <section className="panel">
      <h3>Regional Carbon Intensity Heatmap</h3>
      <p>Carbon intensity (gCO₂/kWh) and estimated energy demand per region under current scenario.</p>
      <div className="heatmap-grid">
        {sorted.map((r) => (
          <div key={r.code} className="heatmap-cell" style={{ '--cell-color': carbonColor(r.carbonIntensity) } as React.CSSProperties}>
            <div className="heatmap-cell-header">
              <span className="heatmap-code">{r.code}</span>
              <span className="heatmap-intensity" style={{ color: carbonColor(r.carbonIntensity) }}>
                {r.carbonIntensity} gCO₂/kWh
              </span>
            </div>
            <p className="heatmap-name">{r.name}</p>
            <div className="heatmap-bar-wrap">
              <div
                className="heatmap-bar"
                style={{
                  width: `${(r.carbonIntensity / maxIntensity) * 100}%`,
                  background: carbonColor(r.carbonIntensity),
                }}
              />
            </div>
            <div className="heatmap-bar-wrap" style={{ marginTop: '0.25rem' }}>
              <div
                className="heatmap-bar"
                style={{
                  width: `${(r.energyKwhPerDay / maxEnergy) * 100}%`,
                  background: '#4cc9f0',
                  opacity: 0.65,
                }}
              />
            </div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '0.2rem 0 0' }}>
              {Math.round(r.renewablePercentage * 100)}% renewable · {(r.energyKwhPerDay / 1000).toFixed(1)} MWh/day
            </p>
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span style={{ color: carbonColor(0) }}>● Low carbon</span>
        <span style={{ color: carbonColor(375) }}>● Medium</span>
        <span style={{ color: carbonColor(750) }}>● High carbon</span>
        <span style={{ color: '#4cc9f0', marginLeft: '1rem' }}>▬ Energy demand</span>
      </div>
    </section>
  );
}
