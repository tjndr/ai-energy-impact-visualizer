import React from 'react';
import { MetricChart } from './MetricChart';

interface CostChartProps {
  value: number;
}

export function CostChart({ value }: CostChartProps): React.JSX.Element {
  return (
    <MetricChart
      title="Cost / day"
      value={value}
      unit="USD"
      color="#ffd166"
      series={[0.54, 0.62, 0.72, 0.83, 0.91, 1].map((factor) => value * factor)}
    />
  );
}
