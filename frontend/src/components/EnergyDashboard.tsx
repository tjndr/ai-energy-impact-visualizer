import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { compactNumberFormatter } from '../utils/formatters';

export function EnergyDashboard(): React.JSX.Element {
  const metrics = useSelector((state: RootState) => state.data);

  return (
    <section>
      <h3>Energy Dashboard</h3>
      <ul>
        <li>Tokens/sec: {compactNumberFormatter.format(metrics.tokensPerSecond)}</li>
        <li>Energy/day (kWh): {compactNumberFormatter.format(metrics.energyKwhPerDay)}</li>
        <li>Cost/day (USD): {compactNumberFormatter.format(metrics.costUsdPerDay)}</li>
        <li>CO2/day (g): {compactNumberFormatter.format(metrics.carbonGramsPerDay)}</li>
      </ul>
    </section>
  );
}
