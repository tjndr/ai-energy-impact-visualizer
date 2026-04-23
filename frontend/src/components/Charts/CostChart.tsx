import React from 'react';
import { MetricChart } from './MetricChart';

interface CostChartProps {
  value: number;
  series: number[];
  yMin: number;
  yMax: number;
}

export function CostChart({ value, series, yMin, yMax }: CostChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="cost-per-day"
      title="Cost / day"
      value={value}
      unit="USD"
      color="#ffd166"
      series={series}
      yMin={yMin}
      yMax={yMax}
    />
  );
}
