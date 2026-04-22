import React from 'react';
import type { Projection } from '../../types';
import { compactNumberFormatter } from '../../utils/formatters';

interface ProjectionChartProps {
  projections: Projection[];
}

export function ProjectionChart({ projections }: ProjectionChartProps): React.JSX.Element {
  if (projections.length === 0) {
    return (
      <article className="metric-card" style={{ gridColumn: '1 / -1' }}>
        <header><p className="metric-title">Energy Projection (kWh/day)</p></header>
        <p style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>Run a scenario to see projections.</p>
      </article>
    );
  }

  const W = 640;
  const H = 200;
  const PAD = { top: 20, right: 20, bottom: 36, left: 64 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const allVals = projections.flatMap((p) => [p.lower, p.upper]);
  const minVal = Math.max(0, Math.min(...allVals) * 0.85);
  const maxVal = Math.max(...allVals) * 1.05;

  const xScale = (i: number) => {
    if (projections.length === 1) return PAD.left + innerW / 2;
    return PAD.left + (i / (projections.length - 1)) * innerW;
  };
  const yScale = (v: number) => PAD.top + innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

  const linePath = projections.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(p.value)}`).join(' ');
  const bandPath = [
    ...projections.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(p.upper)}`),
    ...[...projections].reverse().map((p, i, arr) => `${i === 0 ? 'L' : 'L'}${xScale(arr.length - 1 - i)},${yScale(p.lower)}`),
    'Z',
  ].join(' ');

  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minVal + ((maxVal - minVal) * i) / yTicks);

  return (
    <article className="projection-card">
      <header>
        <p className="metric-title">Energy Projection (kWh/day)</p>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{projections.length}-year forecast with confidence bands</p>
      </header>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Energy projection chart">
        <defs>
          <linearGradient id="proj-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Y-axis grid + labels */}
        {yTickValues.map((v, i) => (
          <g key={i}>
            <line
              x1={PAD.left} y1={yScale(v)}
              x2={W - PAD.right} y2={yScale(v)}
              stroke="rgba(148,163,184,0.15)" strokeWidth={1}
            />
            <text x={PAD.left - 6} y={yScale(v) + 4} textAnchor="end" fill="#64748b" fontSize={10}>
              {compactNumberFormatter.format(v)}
            </text>
          </g>
        ))}

        {/* X-axis year labels */}
        {projections.map((p, i) => (
          <text key={i} x={xScale(i)} y={H - 8} textAnchor="middle" fill="#64748b" fontSize={11}>
            Yr {p.year}
          </text>
        ))}

        {/* Confidence band */}
        <path d={bandPath} fill="#22d3ee" fillOpacity={0.12} />

        {/* Upper / lower dashed bounds */}
        <polyline
          points={projections.map((p, i) => `${xScale(i)},${yScale(p.upper)}`).join(' ')}
          fill="none" stroke="#22d3ee" strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 3"
        />
        <polyline
          points={projections.map((p, i) => `${xScale(i)},${yScale(p.lower)}`).join(' ')}
          fill="none" stroke="#22d3ee" strokeOpacity={0.35} strokeWidth={1} strokeDasharray="4 3"
        />

        {/* Main projection line */}
        <path d={linePath} fill="none" stroke="url(#proj-line-grad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {projections.map((p, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(p.value)} r={3.5} fill="#22d3ee" />
        ))}
      </svg>
    </article>
  );
}
