export interface ScenarioInput {
  modelId: string;
  regionCode: string;
  gpuHourlyCost: number;
  globalAdoptionRate: number;
  dailyUsageMinutes: number;
  tokensPerMinute: number;
  pueMultiplier: number;
  overheadMultiplier: number;
  growthRate: number;
  years: number;
}

export interface Scenario {
  id: string;
  name: string;
  input: ScenarioInput;
}
