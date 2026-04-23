import React from 'react';
import { compactNumberFormatter, numberFormatter } from '../../utils/formatters';

interface MetricChartProps {
  chartId: string;
  title: string;
  value: number;
  unit: string;
  color: string;
  series: number[];
  yMin?: number;
  yMax?: number;
}

const MIN_CHART_RANGE = 1e-9;

export function MetricChart({ chartId, title, value, unit, color, series, yMin, yMax }: MetricChartProps): React.JSX.Element {
  const safeSeries = series.length === 0 ? [0] : series;
  const computedMin = Math.min(...safeSeries, 0);
  const computedMax = Math.max(...safeSeries, 1);
  const minValue = yMin ?? computedMin;
  const maxValue = yMax ?? computedMax;
  const range = Math.max(maxValue - minValue, MIN_CHART_RANGE);
  const chartWidth = 320;
  const chartHeight = 180;
  const pad = { top: 14, right: 12, bottom: 28, left: 52 };
  const innerWidth = chartWidth - pad.left - pad.right;
  const innerHeight = chartHeight - pad.top - pad.bottom;
  const titleId = `${chartId}-title`;

  const xScale = (index: number) => {
    if (safeSeries.length <= 1) {
      return pad.left + innerWidth / 2;
    }
    return pad.left + (index / (safeSeries.length - 1)) * innerWidth;
  };

  const yScale = (point: number) => {
    const normalized = Math.max(0, Math.min(1, (point - minValue) / range));
    return pad.top + innerHeight - normalized * innerHeight;
  };

  const points = safeSeries
    .map((point, index) => {
      const x = xScale(index);
      const y = yScale(point);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const areaPath = [
    `M ${xScale(0)} ${pad.top + innerHeight}`,
    ...safeSeries.map((point, index) => `L ${xScale(index)} ${yScale(point)}`),
    `L ${xScale(safeSeries.length - 1)} ${pad.top + innerHeight}`,
    'Z',
  ].join(' ');

  const yTicks = 4;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minValue + ((maxValue - minValue) * i) / yTicks);
  const xTickIndexes = Array.from(new Set([0, Math.floor((safeSeries.length - 1) / 2), safeSeries.length - 1]))
    .filter((index) => index >= 0);

  const formatTick = (tickValue: number) => {
    if (Math.abs(tickValue) >= 1000) {
      return compactNumberFormatter.format(tickValue);
    }
    if (Math.abs(tickValue) < 1 && tickValue !== 0) {
      return tickValue.toFixed(3);
    }
    return numberFormatter.format(tickValue);
  };

  const latestValue = numberFormatter.format(value);

  return (
    <article className="metric-card">
      <header>
        <p className="metric-title">{title}</p>
        <p>
          {latestValue} <span>{unit}</span>
        </p>
      </header>
      <svg className="metric-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title} trend chart with labeled axes</title>
        <defs>
          <linearGradient id={`gradient-${chartId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {yTickValues.map((tickValue) => (
          <g key={`${chartId}-y-${tickValue}`}>
            <line
              x1={pad.left}
              y1={yScale(tickValue)}
              x2={chartWidth - pad.right}
              y2={yScale(tickValue)}
              stroke="rgba(148,163,184,0.18)"
              strokeWidth={1}
            />
            <text x={pad.left - 6} y={yScale(tickValue) + 4} textAnchor="end" fill="#64748b" fontSize={9}>
              {formatTick(tickValue)}
            </text>
          </g>
        ))}

        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + innerHeight} stroke="#475569" strokeWidth={1.1} />
        <line
          x1={pad.left}
          y1={pad.top + innerHeight}
          x2={chartWidth - pad.right}
          y2={pad.top + innerHeight}
          stroke="#475569"
          strokeWidth={1.1}
        />

        {xTickIndexes.map((index) => (
          <g key={`${chartId}-x-${index}`}>
            <line
              x1={xScale(index)}
              y1={pad.top + innerHeight}
              x2={xScale(index)}
              y2={pad.top + innerHeight + 4}
              stroke="#64748b"
            />
            <text x={xScale(index)} y={chartHeight - 6} textAnchor="middle" fill="#64748b" fontSize={9}>
              {index === safeSeries.length - 1 ? 'Now' : `T${index - (safeSeries.length - 1)}`}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={color} fillOpacity={0.12} />
        <polyline points={points} fill="none" stroke={`url(#gradient-${chartId})`} strokeWidth={2.5} strokeLinecap="round" />

        <circle
          cx={xScale(safeSeries.length - 1)}
          cy={yScale(safeSeries[safeSeries.length - 1] ?? 0)}
          r={3.5}
          fill={color}
          stroke="#020817"
          strokeWidth={1.2}
        />
      </svg>
    </article>
  );
}
