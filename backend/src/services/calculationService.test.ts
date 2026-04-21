import { describe, expect, it } from 'vitest';
import { calculationService } from './calculationService.js';

describe('calculationService', () => {
  it('calculates tokens with per-second conversion', () => {
    const result = calculationService.calculateTokens(0.5, 30, 0.3);
    expect(result.globalTokensPerDay).toBeGreaterThan(0);
    expect(result.tokensPerSecond).toBeCloseTo(result.globalTokensPerDay / 86400, 6);
  });

  it('calculates scenario totals with projections', () => {
    const result = calculationService.calculateScenario({
      globalAdoptionRate: 0.5,
      dailyUsageMinutes: 20,
      tokensPerMinute: 0.3,
      pueMultiplier: 1.4,
      overheadMultiplier: 1.35,
      growthRate: 0.2,
      years: 5,
      modelId: 'gpt4-128k',
      regionCode: 'US',
      gpuHourlyCost: 3,
    });

    expect(result.energyKwhPerDay).toBeGreaterThan(0);
    expect(result.costUsdPerDay).toBeGreaterThan(0);
    expect(result.carbonGramsPerDay).toBeGreaterThan(0);
    expect(result.projections).toHaveLength(5);
  });

  it('rejects invalid scenario inputs', () => {
    expect(() => calculationService.calculateScenario({
      globalAdoptionRate: 1.5,
      dailyUsageMinutes: 20,
      tokensPerMinute: 0.3,
      pueMultiplier: 1.4,
      overheadMultiplier: 1.35,
      growthRate: 0.2,
      years: 5,
      modelId: 'gpt4-128k',
      regionCode: 'US',
      gpuHourlyCost: 3,
    })).toThrowError('Invalid scenario inputs');
  });
});
