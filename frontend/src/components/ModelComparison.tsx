import React, { useState } from 'react';
import { MODELS } from '../utils/calculations';

type SortKey = 'energyPerToken' | 'tokensPerSecond' | 'parameters' | 'contextWindow';

const SORT_LABELS: Record<SortKey, string> = {
  energyPerToken: 'Wh/token',
  tokensPerSecond: 'Speed (tps)',
  parameters: 'Parameters',
  contextWindow: 'Context',
};

function formatParams(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(0)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return String(n);
}

export function ModelComparison(): React.JSX.Element {
  const [sortKey, setSortKey] = useState<SortKey>('energyPerToken');
  const [asc, setAsc] = useState(true);

  const sorted = [...MODELS].sort((a, b) => {
    const av = a[sortKey === 'energyPerToken' ? 'energyPerToken' : sortKey];
    const bv = b[sortKey === 'energyPerToken' ? 'energyPerToken' : sortKey];
    return asc ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const maxEnergy = Math.max(...MODELS.map((m) => m.energyPerToken));
  const maxSpeed = Math.max(...MODELS.map((m) => m.tokensPerSecond));

  function handleSort(key: SortKey) {
    if (key === sortKey) setAsc((v) => !v);
    else { setSortKey(key); setAsc(true); }
  }

  function thProps(key: SortKey) {
    return {
      className: `model-th sortable${sortKey === key ? ' active' : ''}`,
      onClick: () => handleSort(key),
      title: `Sort by ${SORT_LABELS[key]}`,
    };
  }

  return (
    <section>
      <h3>AI Model Comparison</h3>
      <p>
        Side-by-side efficiency comparison across all models. Click column headers to sort. Energy per token is the key
        driver of total inference cost and carbon footprint.
      </p>
      <div className="model-table-wrap">
        <table className="model-table">
          <thead>
            <tr>
              <th className="model-th">Model</th>
              <th className="model-th">Org</th>
              <th {...thProps('parameters')}>Params {sortKey === 'parameters' ? (asc ? '▲' : '▼') : ''}</th>
              <th {...thProps('energyPerToken')}>Wh/token {sortKey === 'energyPerToken' ? (asc ? '▲' : '▼') : ''}</th>
              <th {...thProps('tokensPerSecond')}>Speed {sortKey === 'tokensPerSecond' ? (asc ? '▲' : '▼') : ''}</th>
              <th {...thProps('contextWindow')}>Context {sortKey === 'contextWindow' ? (asc ? '▲' : '▼') : ''}</th>
              <th className="model-th">Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m) => (
              <tr key={m.id} className="model-row">
                <td className="model-name">{m.name}</td>
                <td className="model-org">{m.organization}</td>
                <td className="model-cell">{formatParams(m.parameters)}</td>
                <td className="model-cell">
                  <div className="model-bar-wrap">
                    <div
                      className="model-energy-bar"
                      style={{ width: `${(m.energyPerToken / maxEnergy) * 80}px`, background: `hsl(${(1 - m.energyPerToken / maxEnergy) * 120},70%,50%)` }}
                    />
                    <span>{(m.energyPerToken * 1000).toFixed(3)} mWh</span>
                  </div>
                </td>
                <td className="model-cell">
                  <div className="model-bar-wrap">
                    <div
                      className="model-speed-bar"
                      style={{ width: `${(m.tokensPerSecond / maxSpeed) * 80}px` }}
                    />
                    <span>{m.tokensPerSecond} tps</span>
                  </div>
                </td>
                <td className="model-cell">{m.contextWindow.toLocaleString()}</td>
                <td className="model-cell">
                  <span
                    className="efficiency-badge"
                    style={{
                      background: `hsl(${(1 - m.energyPerToken / maxEnergy) * 120},60%,18%)`,
                      color: `hsl(${(1 - m.energyPerToken / maxEnergy) * 120},80%,65%)`,
                    }}
                  >
                    {m.energyPerToken <= 0.0006 ? 'Efficient' : m.energyPerToken <= 0.0012 ? 'Moderate' : 'High-cost'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
