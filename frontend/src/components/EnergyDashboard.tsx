import React, { useEffect, useMemo, useReducer } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { CarbonChart } from './Charts/CarbonChart';
import { CostChart } from './Charts/CostChart';
import { EnergyChart } from './Charts/EnergyChart';
import { TokenChart } from './Charts/TokenChart';
import { ProjectionChart } from './Charts/ProjectionChart';

const HISTORY_LENGTH = 24;

function appendHistory(history: number[], nextValue: number): number[] {
  if (!Number.isFinite(nextValue)) {
    return history;
  }
  const next = [...history, nextValue];
  return next.length > HISTORY_LENGTH ? next.slice(next.length - HISTORY_LENGTH) : next;
}

function calculateDomain(series: number[]): { min: number; max: number } {
  if (series.length === 0) {
    return { min: 0, max: 1 };
  }
  const min = Math.min(...series);
  const max = Math.max(...series, 1);
  const range = Math.max(max - min, max * 0.1, 1);
  return {
    min: Math.max(0, min - range * 0.1),
    max: max + range * 0.15,
  };
}

interface MetricHistoryState {
  token: number[];
  energy: number[];
  cost: number[];
  carbon: number[];
}

interface MetricSnapshot {
  tokensPerSecond: number;
  energyKwhPerDay: number;
  costUsdPerDay: number;
  carbonGramsPerDay: number;
}

function metricHistoryReducer(state: MetricHistoryState, snapshot: MetricSnapshot): MetricHistoryState {
  return {
    token: appendHistory(state.token, snapshot.tokensPerSecond),
    energy: appendHistory(state.energy, snapshot.energyKwhPerDay),
    cost: appendHistory(state.cost, snapshot.costUsdPerDay),
    carbon: appendHistory(state.carbon, snapshot.carbonGramsPerDay),
  };
}

export function EnergyDashboard(): React.JSX.Element {
  const metrics = useSelector((state: RootState) => state.data);
  const [history, dispatchHistory] = useReducer(metricHistoryReducer, {
    token: [],
    energy: [],
    cost: [],
    carbon: [],
  });

  useEffect(() => {
    dispatchHistory({
      tokensPerSecond: metrics.tokensPerSecond,
      energyKwhPerDay: metrics.energyKwhPerDay,
      costUsdPerDay: metrics.costUsdPerDay,
      carbonGramsPerDay: metrics.carbonGramsPerDay,
    });
  }, [metrics.tokensPerSecond, metrics.energyKwhPerDay, metrics.costUsdPerDay, metrics.carbonGramsPerDay]);

  const tokenDomain = useMemo(() => calculateDomain(history.token), [history.token]);
  const energyDomain = useMemo(() => calculateDomain(history.energy), [history.energy]);
  const costDomain = useMemo(() => calculateDomain(history.cost), [history.cost]);
  const carbonDomain = useMemo(() => calculateDomain(history.carbon), [history.carbon]);

  return (
    <section className="panel">
      <h3>Energy Dashboard</h3>
      <p>Live metrics computed from model efficiency, global adoption rates, and regional energy assumptions.</p>
      <div className="metric-grid">
        <TokenChart value={metrics.tokensPerSecond} series={history.token} yMin={tokenDomain.min} yMax={tokenDomain.max} />
        <EnergyChart value={metrics.energyKwhPerDay} series={history.energy} yMin={energyDomain.min} yMax={energyDomain.max} />
        <CostChart value={metrics.costUsdPerDay} series={history.cost} yMin={costDomain.min} yMax={costDomain.max} />
        <CarbonChart value={metrics.carbonGramsPerDay} series={history.carbon} yMin={carbonDomain.min} yMax={carbonDomain.max} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <ProjectionChart projections={metrics.projections} />
      </div>
    </section>
  );
}
