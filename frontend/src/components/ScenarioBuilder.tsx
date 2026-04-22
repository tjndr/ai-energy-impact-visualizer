import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateScenarioField } from '../store/slices/scenarioSlice';
import { MODELS, REGIONS } from '../utils/calculations';

export function ScenarioBuilder(): React.JSX.Element {
  const scenario = useSelector((state: RootState) => state.scenario);
  const dispatch = useDispatch();

  const setModel = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateScenarioField({ modelId: e.target.value }));
  }, [dispatch]);

  const setRegion = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateScenarioField({ regionCode: e.target.value }));
  }, [dispatch]);

  const setTokensPerMinute = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ tokensPerMinute: Number(e.target.value) }));
  }, [dispatch]);

  const setPue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ pueMultiplier: Number(e.target.value) }));
  }, [dispatch]);

  const setOverhead = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ overheadMultiplier: Number(e.target.value) }));
  }, [dispatch]);

  const setGpuCost = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ gpuHourlyCost: Number(e.target.value) }));
  }, [dispatch]);

  const setGrowthRate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ growthRate: Number(e.target.value) / 100 }));
  }, [dispatch]);

  const setYears = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateScenarioField({ years: Number(e.target.value) }));
  }, [dispatch]);

  return (
    <section className="panel">
      <h3>Scenario Builder</h3>
      <p>Configure model selection, regional context, and projection parameters. All charts update in real time.</p>

      <div className="scenario-grid">
        {/* Model selector */}
        <label className="scenario-field">
          <span className="scenario-label">AI Model</span>
          <select className="scenario-select" value={scenario.modelId} onChange={setModel}>
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.organization}
              </option>
            ))}
          </select>
          <span className="scenario-hint">
            {MODELS.find((m) => m.id === scenario.modelId)?.energyPerToken.toFixed(5)} Wh/token ·{' '}
            {(MODELS.find((m) => m.id === scenario.modelId)?.contextWindow ?? 0).toLocaleString()} ctx
          </span>
        </label>

        {/* Region selector */}
        <label className="scenario-field">
          <span className="scenario-label">Reference Region</span>
          <select className="scenario-select" value={scenario.regionCode} onChange={setRegion}>
            {REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name} ({r.code})
              </option>
            ))}
          </select>
          <span className="scenario-hint">
            {(() => {
              const r = REGIONS.find((x) => x.code === scenario.regionCode);
              return r
                ? `${r.carbonIntensity} gCO₂/kWh · $${r.electricityPrice}/kWh · ${Math.round(r.renewablePercentage * 100)}% renewable`
                : '';
            })()}
          </span>
        </label>

        {/* Tokens per minute */}
        <label className="scenario-field">
          <span className="scenario-label">Tokens per person-minute: {scenario.tokensPerMinute.toFixed(2)}</span>
          <input type="range" min={0.05} max={2} step={0.05} value={scenario.tokensPerMinute} onChange={setTokensPerMinute} />
          <span className="scenario-hint">Average tokens generated per user per minute of AI interaction.</span>
        </label>

        {/* PUE multiplier */}
        <label className="scenario-field">
          <span className="scenario-label">Data-centre PUE: {scenario.pueMultiplier.toFixed(2)}×</span>
          <input type="range" min={1.0} max={2.5} step={0.05} value={scenario.pueMultiplier} onChange={setPue} />
          <span className="scenario-hint">Power Usage Effectiveness — overhead energy per unit of compute (1.0 = perfect).</span>
        </label>

        {/* Overhead multiplier */}
        <label className="scenario-field">
          <span className="scenario-label">Infrastructure overhead: {scenario.overheadMultiplier.toFixed(2)}×</span>
          <input type="range" min={1.0} max={2.0} step={0.05} value={scenario.overheadMultiplier} onChange={setOverhead} />
          <span className="scenario-hint">Networking, storage, and cooling overhead beyond raw compute.</span>
        </label>

        {/* GPU hourly cost */}
        <label className="scenario-field">
          <span className="scenario-label">GPU hourly cost: ${scenario.gpuHourlyCost.toFixed(2)}/hr</span>
          <input type="range" min={0.5} max={10} step={0.25} value={scenario.gpuHourlyCost} onChange={setGpuCost} />
          <span className="scenario-hint">Cloud GPU compute cost (A100 ≈ $3/hr, H100 ≈ $8/hr).</span>
        </label>

        {/* Growth rate */}
        <label className="scenario-field">
          <span className="scenario-label">Annual growth rate: {Math.round(scenario.growthRate * 100)}%</span>
          <input type="range" min={0} max={100} value={scenario.growthRate * 100} onChange={setGrowthRate} />
          <span className="scenario-hint">Year-on-year growth in AI token demand for the projection chart.</span>
        </label>

        {/* Projection years */}
        <label className="scenario-field">
          <span className="scenario-label">Projection horizon: {scenario.years} years</span>
          <input type="range" min={1} max={20} value={scenario.years} onChange={setYears} />
          <span className="scenario-hint">Number of years to project forward in the energy chart.</span>
        </label>
      </div>
    </section>
  );
}
