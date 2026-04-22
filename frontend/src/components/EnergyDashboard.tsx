import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { CarbonChart } from './Charts/CarbonChart';
import { CostChart } from './Charts/CostChart';
import { EnergyChart } from './Charts/EnergyChart';
import { TokenChart } from './Charts/TokenChart';
import { ProjectionChart } from './Charts/ProjectionChart';

export function EnergyDashboard(): React.JSX.Element {
  const metrics = useSelector((state: RootState) => state.data);

  return (
    <section className="panel">
      <h3>Energy Dashboard</h3>
      <p>Live metrics computed from model efficiency, global adoption rates, and regional energy assumptions.</p>
      <div className="metric-grid">
        <TokenChart value={metrics.tokensPerSecond} />
        <EnergyChart value={metrics.energyKwhPerDay} />
        <CostChart value={metrics.costUsdPerDay} />
        <CarbonChart value={metrics.carbonGramsPerDay} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <ProjectionChart projections={metrics.projections} />
      </div>
    </section>
  );
}
