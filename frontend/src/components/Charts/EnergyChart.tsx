import React from 'react';
import { MetricChart } from './MetricChart';

interface EnergyChartProps {
  value: number;
}

export function EnergyChart({ value }: EnergyChartProps): React.JSX.Element {
  return (
    <MetricChart
      title="Energy / day"
      value={value}
      unit="kWh"
      color="#80ed99"
      series={[0.61, 0.69, 0.77, 0.86, 0.95, 1].map((factor) => value * factor)}
    />
  );
}
