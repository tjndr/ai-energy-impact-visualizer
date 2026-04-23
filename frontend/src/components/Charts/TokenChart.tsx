import React from 'react';
import { MetricChart } from './MetricChart';

interface TokenChartProps {
  value: number;
  series: number[];
  yMin: number;
  yMax: number;
}

export function TokenChart({ value, series, yMin, yMax }: TokenChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="tokens-per-second"
      title="Tokens / second"
      value={value}
      unit="tps"
      color="#4cc9f0"
      series={series}
      yMin={yMin}
      yMax={yMax}
    />
  );
}
