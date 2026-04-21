import type { DashboardMetrics, ScenarioInput } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

export async function calculateScenario(input: ScenarioInput): Promise<DashboardMetrics> {
  const response = await fetch(`${API_BASE}/reports/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, modelId: 'gpt4-128k', regionCode: 'US', gpuHourlyCost: 3 }),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate scenario');
  }

  const report = await response.json() as { payload: DashboardMetrics };
  return report.payload;
}
