import React from 'react';
import { MetricChart } from './MetricChart';

interface CarbonChartProps {
  value: number;
  series: number[];
  yMin: number;
  yMax: number;
}

export function CarbonChart({ value, series, yMin, yMax }: CarbonChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="carbon-per-day"
      title="CO2 / day"
      value={value}
      unit="gCO₂"
      color="#ef476f"
      series={series}
      yMin={yMin}
      yMax={yMax}
    />
  );
}
