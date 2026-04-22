import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateScenario } from '../services/api';
import type { RootState, AppDispatch } from '../store/store';
import { setMetrics } from '../store/slices/dataSlice';
import { ControlPanel } from '../components/ControlPanel';
import { WorldMap } from '../components/WorldMap';
import { EnergyDashboard } from '../components/EnergyDashboard';
import { SolutionsPanel } from '../components/SolutionsPanel';

export function Dashboard(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const scenario = useSelector((state: RootState) => state.scenario);

  useEffect(() => {
    void calculateScenario(scenario).then((metrics) => {
      dispatch(setMetrics(metrics));
    }).catch(() => {
      dispatch(setMetrics({ tokensPerSecond: 0, energyKwhPerDay: 0, costUsdPerDay: 0, carbonGramsPerDay: 0, projections: [] }));
    });
  }, [dispatch, scenario]);

  return (
    <main>
      <h2>AI Energy Impact Dashboard</h2>
      <ControlPanel />
      <WorldMap />
      <EnergyDashboard />
      <SolutionsPanel />
    </main>
  );
}
