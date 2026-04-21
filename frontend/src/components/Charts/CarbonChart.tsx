import React from 'react';
import { MetricChart } from './MetricChart';

interface CarbonChartProps {
  value: number;
}

export function CarbonChart({ value }: CarbonChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="carbon-per-day"
      title="CO2 / day"
      value={value}
      unit="gCO₂"
      color="#ef476f"
      series={[0.6, 0.68, 0.76, 0.85, 0.93, 1].map((factor) => value * factor)}
    />
  );
}
