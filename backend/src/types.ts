export interface AIModel {
  id: string;
  name: string;
  organization: string;
  parameters: number;
  tokensPerSecond: number;
  flopsPerToken: number;
  memoryPerToken: number;
  energyPerToken: number;
  architecture: string;
  contextWindow: number;
}

export interface Region {
  code: string;
  name: string;
  population: number;
  gdp: number;
  developmentLevel: 'high' | 'middle' | 'low';
  currentAIAdoption: number;
  electricityPrice: number;
  carbonIntensity: number;
  renewablePercentage: number;
}

export interface Solution {
  id: string;
  category: string;
  name: string;
  description: string;
  energySavingsPercent: number;
  implementationCost: number;
  timeToImplement: string;
  researchPapers: string[];
}

export interface ScenarioInput {
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
  createdAt: string;
  updatedAt: string;
  input: ScenarioInput;
}

export interface CalculationResult {
  tokensPerDay: number;
  tokensPerSecond: number;
  energyKwhPerDay: number;
  costUsdPerDay: number;
  carbonGramsPerDay: number;
  projections: Array<{ year: number; value: number; lower: number; upper: number }>;
}
