import type { AIModel, Region, Solution, ResearchPaper, ScenarioInput, DashboardMetrics } from '../types';

// ---------------------------------------------------------------------------
// Embedded reference data (mirrored from /data/*.json)
// ---------------------------------------------------------------------------

export const MODELS: AIModel[] = [
  { id: 'gpt4-8k', name: 'GPT-4 8K', organization: 'OpenAI', parameters: 1_800_000_000_000, tokensPerSecond: 40, flopsPerToken: 2_000_000_000_000, memoryPerToken: 6, energyPerToken: 0.0016, architecture: 'Transformer', contextWindow: 8_000 },
  { id: 'gpt4-32k', name: 'GPT-4 32K', organization: 'OpenAI', parameters: 1_800_000_000_000, tokensPerSecond: 38, flopsPerToken: 2_100_000_000_000, memoryPerToken: 7, energyPerToken: 0.0017, architecture: 'Transformer', contextWindow: 32_000 },
  { id: 'gpt4-128k', name: 'GPT-4 Turbo', organization: 'OpenAI', parameters: 1_800_000_000_000, tokensPerSecond: 100, flopsPerToken: 2_000_000_000_000, memoryPerToken: 4, energyPerToken: 0.0015, architecture: 'Transformer', contextWindow: 128_000 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', organization: 'OpenAI', parameters: 175_000_000_000, tokensPerSecond: 120, flopsPerToken: 700_000_000_000, memoryPerToken: 3, energyPerToken: 0.0008, architecture: 'Transformer', contextWindow: 16_000 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', organization: 'Anthropic', parameters: 860_000_000_000, tokensPerSecond: 45, flopsPerToken: 1_800_000_000_000, memoryPerToken: 5, energyPerToken: 0.0014, architecture: 'Transformer', contextWindow: 200_000 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', organization: 'Anthropic', parameters: 400_000_000_000, tokensPerSecond: 75, flopsPerToken: 1_200_000_000_000, memoryPerToken: 4, energyPerToken: 0.0011, architecture: 'Transformer', contextWindow: 200_000 },
  { id: 'llama-2-70b', name: 'Llama 2 70B', organization: 'Meta', parameters: 70_000_000_000, tokensPerSecond: 90, flopsPerToken: 300_000_000_000, memoryPerToken: 2, energyPerToken: 0.0006, architecture: 'Transformer', contextWindow: 4_096 },
  { id: 'llama-3-70b', name: 'Llama 3 70B', organization: 'Meta', parameters: 70_000_000_000, tokensPerSecond: 95, flopsPerToken: 310_000_000_000, memoryPerToken: 2, energyPerToken: 0.00055, architecture: 'Transformer', contextWindow: 8_192 },
  { id: 'mistral-7b', name: 'Mistral 7B', organization: 'Mistral AI', parameters: 7_000_000_000, tokensPerSecond: 140, flopsPerToken: 80_000_000_000, memoryPerToken: 1, energyPerToken: 0.00025, architecture: 'Transformer', contextWindow: 8_192 },
  { id: 'palm-2', name: 'PaLM 2', organization: 'Google', parameters: 340_000_000_000, tokensPerSecond: 80, flopsPerToken: 1_100_000_000_000, memoryPerToken: 4, energyPerToken: 0.001, architecture: 'Transformer', contextWindow: 32_768 },
];

export const REGIONS: Region[] = [
  { code: 'US', name: 'United States', population: 334_900_000, gdp: 27_360_900_000_000, developmentLevel: 'high', currentAIAdoption: 0.35, electricityPrice: 0.085, carbonIntensity: 385, renewablePercentage: 0.21 },
  { code: 'IS', name: 'Iceland', population: 394_000, gdp: 31_000_000_000, developmentLevel: 'high', currentAIAdoption: 0.32, electricityPrice: 0.03, carbonIntensity: 28, renewablePercentage: 0.99 },
  { code: 'SG', name: 'Singapore', population: 5_920_000, gdp: 501_400_000_000, developmentLevel: 'high', currentAIAdoption: 0.45, electricityPrice: 0.18, carbonIntensity: 408, renewablePercentage: 0.04 },
  { code: 'IN', name: 'India', population: 1_429_000_000, gdp: 3_568_000_000_000, developmentLevel: 'middle', currentAIAdoption: 0.19, electricityPrice: 0.09, carbonIntensity: 708, renewablePercentage: 0.24 },
  { code: 'CN', name: 'China', population: 1_410_000_000, gdp: 17_795_000_000_000, developmentLevel: 'middle', currentAIAdoption: 0.31, electricityPrice: 0.08, carbonIntensity: 550, renewablePercentage: 0.31 },
  { code: 'DE', name: 'Germany', population: 84_500_000, gdp: 4_526_000_000_000, developmentLevel: 'high', currentAIAdoption: 0.29, electricityPrice: 0.31, carbonIntensity: 350, renewablePercentage: 0.52 },
  { code: 'BR', name: 'Brazil', population: 203_100_000, gdp: 2_174_000_000_000, developmentLevel: 'middle', currentAIAdoption: 0.17, electricityPrice: 0.14, carbonIntensity: 92, renewablePercentage: 0.86 },
  { code: 'NG', name: 'Nigeria', population: 227_900_000, gdp: 364_000_000_000, developmentLevel: 'low', currentAIAdoption: 0.08, electricityPrice: 0.12, carbonIntensity: 432, renewablePercentage: 0.19 },
  { code: 'JP', name: 'Japan', population: 123_900_000, gdp: 4_213_000_000_000, developmentLevel: 'high', currentAIAdoption: 0.28, electricityPrice: 0.26, carbonIntensity: 462, renewablePercentage: 0.24 },
  { code: 'CA', name: 'Canada', population: 40_900_000, gdp: 2_143_000_000_000, developmentLevel: 'high', currentAIAdoption: 0.33, electricityPrice: 0.11, carbonIntensity: 130, renewablePercentage: 0.67 },
];

export const SOLUTIONS: Solution[] = [
  { id: 'quantization-int8', category: 'efficiency', name: 'INT8 Quantization', description: 'Reduce model precision from FP32 to INT8', energySavingsPercent: 35, implementationCost: 50_000, timeToImplement: '1-2 months', researchPapers: ['arxiv:2104.08378'] },
  { id: 'quantization-int4', category: 'efficiency', name: 'INT4 Quantization', description: 'Aggressive low-bit quantization for maximum compression', energySavingsPercent: 50, implementationCost: 90_000, timeToImplement: '2-3 months', researchPapers: ['arxiv:2210.17323'] },
  { id: 'pruning', category: 'efficiency', name: 'Structured Pruning', description: 'Remove unused weights and channels from the model', energySavingsPercent: 45, implementationCost: 75_000, timeToImplement: '2 months', researchPapers: ['arxiv:1710.01878'] },
  { id: 'distillation', category: 'efficiency', name: 'Knowledge Distillation', description: 'Train compact student models from large teacher models', energySavingsPercent: 60, implementationCost: 120_000, timeToImplement: '3-4 months', researchPapers: ['arxiv:1503.02531'] },
  { id: 'moe', category: 'efficiency', name: 'Sparse MoE', description: 'Activate only a subset of experts per token', energySavingsPercent: 55, implementationCost: 200_000, timeToImplement: '4-6 months', researchPapers: ['arxiv:1701.06538'] },
  { id: 'tpu', category: 'hardware', name: 'TPU Migration', description: 'Move inference workloads from GPUs to custom TPUs', energySavingsPercent: 40, implementationCost: 500_000, timeToImplement: '6-9 months', researchPapers: ['arxiv:1704.04760'] },
  { id: 'liquid-cooling', category: 'hardware', name: 'Liquid Cooling', description: 'Deploy advanced liquid cooling in data centers', energySavingsPercent: 25, implementationCost: 350_000, timeToImplement: '3-6 months', researchPapers: ['arxiv:2403.05199'] },
  { id: 'renewables', category: 'renewable', name: 'Renewable Power Purchase', description: 'Increase green power procurement agreements', energySavingsPercent: 30, implementationCost: 250_000, timeToImplement: '6-12 months', researchPapers: ['arxiv:2305.07017'] },
  { id: 'edge-inference', category: 'edge', name: 'Edge Inference', description: 'Shift inference to on-device hardware to cut data-center load', energySavingsPercent: 90, implementationCost: 180_000, timeToImplement: '4-8 months', researchPapers: ['arxiv:2301.13861'] },
  { id: 'grid-balancing', category: 'renewable', name: 'Grid Load Balancing', description: 'Schedule batch jobs around low-carbon grid hours', energySavingsPercent: 20, implementationCost: 100_000, timeToImplement: '2-4 months', researchPapers: ['arxiv:2104.10350'] },
];

export const PAPERS: ResearchPaper[] = [
  { title: 'Energy and Policy Considerations for Deep Learning in NLP', authors: ['Emma Strubell', 'Ananya Ganesh', 'Andrew McCallum'], year: 2019, url: 'https://arxiv.org/abs/1906.02629', citations: 2000, topics: ['efficiency', 'energy', 'nlp'] },
  { title: 'Efficient Estimation of Word Representations in Vector Space', authors: ['Tomas Mikolov et al.'], year: 2013, url: 'https://arxiv.org/abs/1301.3781', citations: 30_000, topics: ['efficiency', 'nlp'] },
  { title: 'Switch Transformers: Scaling to Trillion Parameter Models', authors: ['William Fedus', 'Barret Zoph', 'Noam Shazeer'], year: 2021, url: 'https://arxiv.org/abs/2101.03961', citations: 2_500, topics: ['mixture-of-experts', 'scaling'] },
  { title: 'LLM in a Flash: Efficient Large Language Model Inference', authors: ['Alizadeh et al.'], year: 2024, url: 'https://arxiv.org/abs/2312.11514', citations: 300, topics: ['edge', 'inference', 'efficiency'] },
  { title: 'Carbon Emissions and Large Neural Network Training', authors: ['David Patterson et al.'], year: 2021, url: 'https://arxiv.org/abs/2104.10350', citations: 1_200, topics: ['carbon', 'training', 'sustainability'] },
  { title: 'Scaling Laws for Neural Language Models', authors: ['Kaplan et al.'], year: 2020, url: 'https://arxiv.org/abs/2001.08361', citations: 6_000, topics: ['scaling', 'efficiency'] },
];

// ---------------------------------------------------------------------------
// Constants (mirrored from backend/src/utils/constants.ts)
// ---------------------------------------------------------------------------
const GPU_EFFICIENCY_FLOPS_PER_JOULE = 1e11;
const SECONDS_PER_DAY = 86_400;
const COOLING_COST_RATIO = 0.4;
const MIN_TOKENS_PER_SECOND = 1e-9;

// ---------------------------------------------------------------------------
// Default scenario
// ---------------------------------------------------------------------------
export function defaultScenario(): ScenarioInput {
  return {
    modelId: 'gpt4-128k',
    regionCode: 'US',
    gpuHourlyCost: 3,
    globalAdoptionRate: 0.5,
    dailyUsageMinutes: 30,
    tokensPerMinute: 0.3,
    pueMultiplier: 1.4,
    overheadMultiplier: 1.35,
    growthRate: 0.2,
    years: 5,
  };
}

// ---------------------------------------------------------------------------
// Local calculation engine (port of backend calculationService)
// ---------------------------------------------------------------------------
export function calculateScenarioLocally(scenario: ScenarioInput): DashboardMetrics {
  const model = MODELS.find((m) => m.id === scenario.modelId) ?? MODELS[0];
  const region = REGIONS.find((r) => r.code === scenario.regionCode) ?? REGIONS[0];

  // 1. Tokens across all regions
  let globalTokensPerDay = 0;
  for (const r of REGIONS) {
    const adoptionRate = Math.min(1, Math.max(0, scenario.globalAdoptionRate * r.currentAIAdoption));
    globalTokensPerDay += r.population * adoptionRate * scenario.dailyUsageMinutes * scenario.tokensPerMinute;
  }
  const tokensPerSecond = globalTokensPerDay / SECONDS_PER_DAY;

  // 2. Energy (kWh/day)
  const flopsPerDay = globalTokensPerDay * model.flopsPerToken;
  const baseEnergyKwh = flopsPerDay / (GPU_EFFICIENCY_FLOPS_PER_JOULE * 3_600 * 1_000);
  const energyKwhPerDay = baseEnergyKwh * scenario.pueMultiplier * scenario.overheadMultiplier;

  // 3. Cost (USD/day) based on selected region's electricity price
  const electricityCost = energyKwhPerDay * region.electricityPrice;
  const safeTokensPerSecond = Math.max(tokensPerSecond, MIN_TOKENS_PER_SECOND);
  const hardwareCost = globalTokensPerDay * (scenario.gpuHourlyCost / 3_600 / safeTokensPerSecond);
  const coolingCost = electricityCost * COOLING_COST_RATIO;
  const costUsdPerDay = electricityCost + hardwareCost + coolingCost;

  // 4. Carbon (gCO₂/day) based on selected region's carbon intensity
  const carbonGramsPerDay = energyKwhPerDay * region.carbonIntensity;

  // 5. Projections
  const projections = Array.from({ length: scenario.years }, (_, i) => {
    const year = i + 1;
    const value = energyKwhPerDay * (1 + scenario.growthRate) ** year;
    const confidence = Math.min(scenario.growthRate * year, 0.95);
    return {
      year,
      value,
      lower: value * (1 - confidence),
      upper: value * (1 + confidence),
    };
  });

  return { tokensPerSecond, energyKwhPerDay, costUsdPerDay, carbonGramsPerDay, projections };
}

// ---------------------------------------------------------------------------
// Per-region energy breakdown (for WorldMap / HeatmapChart)
// ---------------------------------------------------------------------------
export interface RegionMetrics {
  code: string;
  name: string;
  population: number;
  currentAIAdoption: number;
  effectiveAdoptionRate: number;
  tokensPerDay: number;
  energyKwhPerDay: number;
  carbonGramsPerDay: number;
  carbonIntensity: number;
  renewablePercentage: number;
}

export function calculateRegionBreakdown(scenario: ScenarioInput): RegionMetrics[] {
  const model = MODELS.find((m) => m.id === scenario.modelId) ?? MODELS[0];

  return REGIONS.map((r) => {
    const effectiveAdoptionRate = Math.min(1, Math.max(0, scenario.globalAdoptionRate * r.currentAIAdoption));
    const tokensPerDay = r.population * effectiveAdoptionRate * scenario.dailyUsageMinutes * scenario.tokensPerMinute;
    const flopsPerDay = tokensPerDay * model.flopsPerToken;
    const baseEnergyKwh = flopsPerDay / (GPU_EFFICIENCY_FLOPS_PER_JOULE * 3_600 * 1_000);
    const energyKwhPerDay = baseEnergyKwh * scenario.pueMultiplier * scenario.overheadMultiplier;
    const carbonGramsPerDay = energyKwhPerDay * r.carbonIntensity;
    return {
      code: r.code,
      name: r.name,
      population: r.population,
      currentAIAdoption: r.currentAIAdoption,
      effectiveAdoptionRate,
      tokensPerDay,
      energyKwhPerDay,
      carbonGramsPerDay,
      carbonIntensity: r.carbonIntensity,
      renewablePercentage: r.renewablePercentage,
    };
  });
}
