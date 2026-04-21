import React from 'react';
import { MetricChart } from './MetricChart';

interface TokenChartProps {
  value: number;
}

export function TokenChart({ value }: TokenChartProps): React.JSX.Element {
  return (
    <MetricChart
      chartId="tokens-per-second"
      title="Tokens / second"
      value={value}
      unit="tps"
      color="#4cc9f0"
      series={[0.58, 0.66, 0.73, 0.84, 0.92, 1].map((factor) => value * factor)}
    />
  );
}
