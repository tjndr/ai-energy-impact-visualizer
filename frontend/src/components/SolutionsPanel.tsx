import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { SOLUTIONS } from '../utils/calculations';

const CATEGORY_COLORS: Record<string, string> = {
  efficiency: '#4cc9f0',
  hardware: '#ffd166',
  renewable: '#80ed99',
  edge: '#f4a261',
};

const CATEGORY_LABELS: Record<string, string> = {
  efficiency: 'Efficiency',
  hardware: 'Hardware',
  renewable: 'Renewable',
  edge: 'Edge',
};

export function SolutionsPanel(): React.JSX.Element {
  const energyKwh = useSelector((state: RootState) => state.data.energyKwhPerDay);

  return (
    <section className="panel">
      <h3>Solutions &amp; Remediation Tracks</h3>
      <p>
        Proven techniques for reducing AI energy consumption. Energy savings are calculated relative to the current scenario
        ({energyKwh > 0 ? `${(energyKwh / 1000).toFixed(1)} MWh/day baseline` : 'run a scenario first'}).
      </p>
      <div className="solutions-grid">
        {SOLUTIONS.map((sol) => {
          const savedKwh = energyKwh * (sol.energySavingsPercent / 100);
          const color = CATEGORY_COLORS[sol.category] ?? '#94a3b8';
          return (
            <article key={sol.id} className="solution-card">
              <div className="solution-header">
                <span className="solution-badge" style={{ background: color + '22', color }}>
                  {CATEGORY_LABELS[sol.category] ?? sol.category}
                </span>
                <span className="solution-savings">−{sol.energySavingsPercent}%</span>
              </div>
              <h4 className="solution-name">{sol.name}</h4>
              <p className="solution-desc">{sol.description}</p>
              <div className="solution-bar-track">
                <div
                  className="solution-bar-fill"
                  style={{ width: `${sol.energySavingsPercent}%`, background: color }}
                />
              </div>
              <div className="solution-meta">
                <span>
                  {energyKwh > 0
                    ? `Saves ~${(savedKwh / 1000).toFixed(1)} MWh/day`
                    : `Saves up to ${sol.energySavingsPercent}% energy`}
                </span>
                <span>${(sol.implementationCost / 1000).toFixed(0)}K · {sol.timeToImplement}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
