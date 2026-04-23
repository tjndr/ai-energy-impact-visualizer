import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { calculateRegionBreakdown } from '../utils/calculations';
import { compactNumberFormatter } from '../utils/formatters';

function carbonColor(intensity: number): string {
  const ratio = Math.min(intensity / 750, 1);
  const r = Math.round(239 * ratio + 34 * (1 - ratio));
  const g = Math.round(71 * ratio + 197 * (1 - ratio));
  const b = Math.round(111 * ratio + 94 * (1 - ratio));
  return `rgb(${r},${g},${b})`;
}

export function WorldMap(): React.JSX.Element {
  const scenario = useSelector((state: RootState) => state.scenario);
  const breakdown = useMemo(() => calculateRegionBreakdown(scenario), [scenario]);
  const sorted = [...breakdown].sort((a, b) => b.energyKwhPerDay - a.energyKwhPerDay);
  const totalEnergy = sorted.reduce((sum, region) => sum + region.energyKwhPerDay, 0);
  const totalCarbon = sorted.reduce((sum, region) => sum + region.carbonGramsPerDay, 0);
  const topRegion = sorted[0];
  const perCapitaLeader = sorted.reduce<null | (typeof sorted)[number]>((leader, candidate) => {
    if (!leader) return candidate;
    const leaderPerCapita = leader.energyKwhPerDay / Math.max(leader.population, 1);
    const candidatePerCapita = candidate.energyKwhPerDay / Math.max(candidate.population, 1);
    return candidatePerCapita > leaderPerCapita ? candidate : leader;
  }, null);
  const topRegionPopulation = topRegion ? compactNumberFormatter.format(topRegion.population) : '0';
  const topRegionEffectiveAdoption = topRegion ? Math.round(topRegion.effectiveAdoptionRate * 1000) / 10 : 0;

  return (
    <section className="panel">
      <h3>Regional Energy &amp; Carbon Breakdown</h3>
      <p>
        Estimated AI energy consumption and CO₂ emissions by region, based on population, local AI adoption rate, and grid
        carbon intensity. Bar width = share of global total.
      </p>
      {topRegion ? (
        <p style={{ marginTop: '-0.1rem', color: '#94a3b8', fontSize: '0.82rem' }}>
          Ranking note: {topRegion.name} leads in absolute demand because demand scales with population × effective adoption (
          {topRegionPopulation} people × {topRegionEffectiveAdoption}%).
          {perCapitaLeader ? ` Per-capita leader: ${perCapitaLeader.name}.` : ''}
        </p>
      ) : null}
      <div className="region-table">
        <div className="region-header">
          <span>Region</span>
          <span>Energy (kWh/day)</span>
          <span>CO₂ (kg/day)</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Renewable %</span>
        </div>
        {sorted.map((r) => {
          const energyShare = totalEnergy > 0 ? (r.energyKwhPerDay / totalEnergy) * 100 : 0;
          const carbonShare = totalCarbon > 0 ? (r.carbonGramsPerDay / totalCarbon) * 100 : 0;
          return (
          <div key={r.code} className="region-row">
            <div className="region-name">
              <span className="region-code">{r.code}</span>
              <span>{r.name}</span>
            </div>

            <div className="region-bar-cell">
              <div className="region-bar-track">
                <div
                  className="region-bar-fill"
                  style={{
                    width: `${energyShare}%`,
                    background: '#4cc9f0',
                  }}
                />
              </div>
              <span className="region-bar-label">{compactNumberFormatter.format(r.energyKwhPerDay)} ({energyShare.toFixed(1)}%)</span>
            </div>

            <div className="region-bar-cell">
              <div className="region-bar-track">
                <div
                  className="region-bar-fill"
                  style={{
                    width: `${carbonShare}%`,
                    background: carbonColor(r.carbonIntensity),
                  }}
                />
              </div>
              <span className="region-bar-label" style={{ color: carbonColor(r.carbonIntensity) }}>
                {compactNumberFormatter.format(r.carbonGramsPerDay / 1000)} ({carbonShare.toFixed(1)}%)
              </span>
            </div>

            <div className="region-renewable">
              <div className="region-renewable-bar" style={{ width: `${r.renewablePercentage * 100}%` }} />
              <span>{Math.round(r.renewablePercentage * 100)}%</span>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
