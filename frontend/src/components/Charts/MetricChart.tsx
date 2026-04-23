import React from 'react';
import { numberFormatter } from '../../utils/formatters';

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

export function MetricChart({ chartId, title, value, unit, color, series, yMin, yMax }: MetricChartProps): React.JSX.Element {
  const safeSeries = series.length === 0 ? [0] : series;
  const computedMin = Math.min(...safeSeries, 0);
  const computedMax = Math.max(...safeSeries, 1);
  const minValue = yMin ?? computedMin;
  const maxValue = Math.max(yMax ?? computedMax, minValue + 1e-9);
  const range = maxValue - minValue;
  const chartWidth = 320;
  const chartHeight = 160;
  const titleId = `${chartId}-title`;

  const points = safeSeries
    .map((point, index) => {
      const x = (index / Math.max(safeSeries.length - 1, 1)) * chartWidth;
      const normalized = Math.max(0, Math.min(1, (point - minValue) / range));
      const y = chartHeight - normalized * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

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
        <title id={titleId}>{title} trend chart</title>
        <defs>
          <linearGradient id={`gradient-${chartId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <polyline points={points} fill="none" stroke={`url(#gradient-${chartId})`} strokeWidth={4} strokeLinecap="round" />
      </svg>
    </article>
  );
}
