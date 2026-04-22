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
  const maxEnergy = Math.max(...sorted.map((r) => r.energyKwhPerDay), 1);
  const maxCarbon = Math.max(...sorted.map((r) => r.carbonGramsPerDay), 1);

  return (
    <section className="panel">
      <h3>Regional Energy &amp; Carbon Breakdown</h3>
      <p>
        Estimated AI energy consumption and CO₂ emissions by region, based on population, local AI adoption rate, and grid
        carbon intensity. Bar width = share of global total.
      </p>
      <div className="region-table">
        <div className="region-header">
          <span>Region</span>
          <span>Energy (kWh/day)</span>
          <span>CO₂ (kg/day)</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Renewable %</span>
        </div>
        {sorted.map((r) => (
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
                    width: `${(r.energyKwhPerDay / maxEnergy) * 100}%`,
                    background: '#4cc9f0',
                  }}
                />
              </div>
              <span className="region-bar-label">{compactNumberFormatter.format(r.energyKwhPerDay)}</span>
            </div>

            <div className="region-bar-cell">
              <div className="region-bar-track">
                <div
                  className="region-bar-fill"
                  style={{
                    width: `${(r.carbonGramsPerDay / maxCarbon) * 100}%`,
                    background: carbonColor(r.carbonIntensity),
                  }}
                />
              </div>
              <span className="region-bar-label" style={{ color: carbonColor(r.carbonIntensity) }}>
                {compactNumberFormatter.format(r.carbonGramsPerDay / 1000)}
              </span>
            </div>

            <div className="region-renewable">
              <div className="region-renewable-bar" style={{ width: `${r.renewablePercentage * 100}%` }} />
              <span>{Math.round(r.renewablePercentage * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
