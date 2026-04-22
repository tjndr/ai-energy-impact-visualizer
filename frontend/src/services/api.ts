import type { DashboardMetrics, ScenarioInput } from '../types';
import { calculateScenarioLocally } from '../utils/calculations';

export function calculateScenario(input: ScenarioInput): Promise<DashboardMetrics> {
  return Promise.resolve(calculateScenarioLocally(input));
}
