import React, { useEffect, useMemo, useState } from 'react';
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

export function EnergyDashboard(): React.JSX.Element {
  const metrics = useSelector((state: RootState) => state.data);
  const [tokenHistory, setTokenHistory] = useState<number[]>([]);
  const [energyHistory, setEnergyHistory] = useState<number[]>([]);
  const [costHistory, setCostHistory] = useState<number[]>([]);
  const [carbonHistory, setCarbonHistory] = useState<number[]>([]);

  useEffect(() => {
    setTokenHistory((history) => appendHistory(history, metrics.tokensPerSecond));
    setEnergyHistory((history) => appendHistory(history, metrics.energyKwhPerDay));
    setCostHistory((history) => appendHistory(history, metrics.costUsdPerDay));
    setCarbonHistory((history) => appendHistory(history, metrics.carbonGramsPerDay));
  }, [metrics.tokensPerSecond, metrics.energyKwhPerDay, metrics.costUsdPerDay, metrics.carbonGramsPerDay]);

  const tokenDomain = useMemo(() => calculateDomain(tokenHistory), [tokenHistory]);
  const energyDomain = useMemo(() => calculateDomain(energyHistory), [energyHistory]);
  const costDomain = useMemo(() => calculateDomain(costHistory), [costHistory]);
  const carbonDomain = useMemo(() => calculateDomain(carbonHistory), [carbonHistory]);

  return (
    <section className="panel">
      <h3>Energy Dashboard</h3>
      <p>Live metrics computed from model efficiency, global adoption rates, and regional energy assumptions.</p>
      <div className="metric-grid">
        <TokenChart value={metrics.tokensPerSecond} series={tokenHistory} yMin={tokenDomain.min} yMax={tokenDomain.max} />
        <EnergyChart value={metrics.energyKwhPerDay} series={energyHistory} yMin={energyDomain.min} yMax={energyDomain.max} />
        <CostChart value={metrics.costUsdPerDay} series={costHistory} yMin={costDomain.min} yMax={costDomain.max} />
        <CarbonChart value={metrics.carbonGramsPerDay} series={carbonHistory} yMin={carbonDomain.min} yMax={carbonDomain.max} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <ProjectionChart projections={metrics.projections} />
      </div>
    </section>
  );
}
