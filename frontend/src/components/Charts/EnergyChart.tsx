import React from 'react';
import { MetricChart } from './MetricChart';

interface EnergyChartProps {
  value: number;
  series: number[];
  yMin: number;
  yMax: number;
}

export function EnergyChart({ value, series, yMin, yMax }: EnergyChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="energy-per-day"
      title="Energy / day"
      value={value}
      unit="kWh"
      color="#80ed99"
      series={series}
      yMin={yMin}
      yMax={yMax}
    />
  );
}
