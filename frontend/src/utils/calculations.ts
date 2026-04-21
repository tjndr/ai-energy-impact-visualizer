import type { ScenarioInput } from '../types';

export function defaultScenario(): ScenarioInput {
  return {
    globalAdoptionRate: 0.5,
    dailyUsageMinutes: 30,
    tokensPerMinute: 0.3,
    pueMultiplier: 1.4,
    overheadMultiplier: 1.35,
    growthRate: 0.2,
    years: 5,
  };
}
