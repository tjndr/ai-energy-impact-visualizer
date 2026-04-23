import React from 'react';
import type { RegionMetrics } from '../../utils/calculations';
import { compactNumberFormatter } from '../../utils/formatters';

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

  const sorted = [...regions].sort((a, b) => b.energyKwhPerDay - a.energyKwhPerDay);
  const maxIntensity = Math.max(...sorted.map((r) => r.carbonIntensity), 1);
  const maxEnergy = Math.max(...sorted.map((r) => r.energyKwhPerDay), 1);

  const W = 760;
  const H = 320;
  const PAD = { top: 20, right: 20, bottom: 52, left: 64 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const xScale = (energyKwhPerDay: number) => PAD.left + (energyKwhPerDay / maxEnergy) * innerW;
  const yScale = (intensity: number) => PAD.top + innerH - (intensity / maxIntensity) * innerH;
  const radiusScale = (adoptionRate: number) => 5 + adoptionRate * 16;

  const xTicks = 4;
  const yTicks = 4;
  const xTickValues = Array.from({ length: xTicks + 1 }, (_, i) => (maxEnergy * i) / xTicks);
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => (maxIntensity * i) / yTicks);

  return (
    <section className="panel">
      <h3>Regional Carbon Intensity Scatter Plot</h3>
      <p>
        X-axis: modeled energy demand (kWh/day). Y-axis: grid carbon intensity (gCO₂/kWh). Bubble size: effective AI adoption rate.
      </p>
      <div className="heatmap-grid">
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', maxWidth: '100%' }} role="img" aria-label="Regional carbon intensity scatter plot">
          {yTickValues.map((value) => (
            <g key={`y-${value}`}>
              <line x1={PAD.left} y1={yScale(value)} x2={W - PAD.right} y2={yScale(value)} stroke="rgba(148,163,184,0.15)" />
              <text x={PAD.left - 6} y={yScale(value) + 4} textAnchor="end" fill="#64748b" fontSize={10}>
                {Math.round(value)}
              </text>
            </g>
          ))}
          {xTickValues.map((value) => (
            <g key={`x-${value}`}>
              <line x1={xScale(value)} y1={PAD.top} x2={xScale(value)} y2={H - PAD.bottom} stroke="rgba(148,163,184,0.1)" />
              <text x={xScale(value)} y={H - PAD.bottom + 16} textAnchor="middle" fill="#64748b" fontSize={10}>
                {compactNumberFormatter.format(value)}
              </text>
            </g>
          ))}

          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} stroke="#475569" strokeWidth={1.1} />
          <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="#475569" strokeWidth={1.1} />

          {sorted.map((r) => (
            <g key={r.code}>
              <circle
                cx={xScale(r.energyKwhPerDay)}
                cy={yScale(r.carbonIntensity)}
                r={radiusScale(r.effectiveAdoptionRate)}
                fill={carbonColor(r.carbonIntensity)}
                fillOpacity={0.72}
                stroke="#0b1220"
                strokeWidth={1.2}
              />
              <text x={xScale(r.energyKwhPerDay)} y={yScale(r.carbonIntensity) + 3} textAnchor="middle" fill="#f8fafc" fontSize={9} fontWeight={700}>
                {r.code}
              </text>
            </g>
          ))}

          <text x={W / 2} y={H - 8} textAnchor="middle" fill="#94a3b8" fontSize={10}>
            Modeled energy demand (kWh/day)
          </text>
          <text x={14} y={H / 2} textAnchor="middle" fill="#94a3b8" fontSize={10} transform={`rotate(-90 14 ${H / 2})`}>
            Carbon intensity (gCO₂/kWh)
          </text>
        </svg>
      </div>
      <div className="heatmap-legend">
        <span style={{ color: carbonColor(0) }}>● Low carbon</span>
        <span style={{ color: carbonColor(375) }}>● Medium</span>
        <span style={{ color: carbonColor(750) }}>● High carbon</span>
        <span style={{ color: '#94a3b8', marginLeft: '1rem' }}>Bubble size = effective adoption rate</span>
      </div>
    </section>
  );
}
