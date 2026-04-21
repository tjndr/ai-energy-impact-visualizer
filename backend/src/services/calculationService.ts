import { dataService } from './dataService.js';
import { energyService } from './energyService.js';
import { carbonService } from './carbonService.js';
import { forecastService } from './forecastService.js';
import { DEFAULT_PUE, DEFAULT_OVERHEAD_MULTIPLIER, DEFAULT_TOKENS_PER_MINUTE } from '../utils/constants.js';
import { secondsPerDay } from '../utils/conversions.js';
import type { CalculationResult, ScenarioInput } from '../types.js';

export class CalculationService {
  calculateTokens(globalAdoptionRate: number, dailyUsageMinutes: number, tokensPerMinute = DEFAULT_TOKENS_PER_MINUTE): { perRegion: Array<{ regionCode: string; tokensPerDay: number }>; globalTokensPerDay: number; tokensPerSecond: number } {
    const perRegion = dataService.getRegions().map((region) => {
      const adoptionRate = Math.min(1, Math.max(0, globalAdoptionRate * region.currentAIAdoption));
      const tokensPerDay = region.population * adoptionRate * dailyUsageMinutes * tokensPerMinute;
      return { regionCode: region.code, tokensPerDay };
    });

    const globalTokensPerDay = perRegion.reduce((sum, region) => sum + region.tokensPerDay, 0);
    return {
      perRegion,
      globalTokensPerDay,
      tokensPerSecond: globalTokensPerDay / secondsPerDay,
    };
  }

  calculateEnergy(input: Pick<ScenarioInput, 'globalAdoptionRate' | 'dailyUsageMinutes' | 'tokensPerMinute' | 'pueMultiplier' | 'overheadMultiplier'> & { modelId: string }): { energyKwhPerDay: number; tokensPerDay: number; tokensPerSecond: number } {
    const model = dataService.getModelById(input.modelId);
    if (!model) {
      throw new Error('Model not found');
    }

    const tokenResult = this.calculateTokens(input.globalAdoptionRate, input.dailyUsageMinutes, input.tokensPerMinute);
    const energyKwhPerDay = energyService.calculateEnergyKwh(
      tokenResult.globalTokensPerDay,
      model.flopsPerToken,
      input.pueMultiplier ?? DEFAULT_PUE,
      input.overheadMultiplier ?? DEFAULT_OVERHEAD_MULTIPLIER,
    );

    return {
      energyKwhPerDay,
      tokensPerDay: tokenResult.globalTokensPerDay,
      tokensPerSecond: tokenResult.tokensPerSecond,
    };
  }

  calculateCost(energyKwh: number, electricityRatePerKwh: number, tokensPerDay: number, tokensPerSecond: number, gpuHourlyCost: number): number {
    const electricityCost = energyKwh * electricityRatePerKwh;
    const safeTokensPerSecond = Math.max(tokensPerSecond, 1e-9);
    const hardwareCost = tokensPerDay * (gpuHourlyCost / 3600 / safeTokensPerSecond);
    const coolingCost = electricityCost * 0.4;
    return electricityCost + hardwareCost + coolingCost;
  }

  calculateScenario(input: ScenarioInput & { modelId: string; regionCode: string; gpuHourlyCost: number }): CalculationResult {
    const region = dataService.getRegionByCode(input.regionCode);
    const model = dataService.getModelById(input.modelId);
    if (!region || !model) {
      throw new Error('Invalid scenario inputs');
    }

    const energy = this.calculateEnergy(input);
    const cost = this.calculateCost(energy.energyKwhPerDay, region.electricityPrice, energy.tokensPerDay, energy.tokensPerSecond, input.gpuHourlyCost);
    const carbon = carbonService.calculateCarbonGrams(energy.energyKwhPerDay, region.carbonIntensity);

    return {
      tokensPerDay: energy.tokensPerDay,
      tokensPerSecond: energy.tokensPerSecond,
      energyKwhPerDay: energy.energyKwhPerDay,
      costUsdPerDay: cost,
      carbonGramsPerDay: carbon,
      projections: forecastService.project(energy.energyKwhPerDay, input.growthRate, input.years),
    };
  }

  calculateSolutionImpact(baseEnergyKwh: number, savingsPercent: number): number {
    const reductionFactor = Math.min(100, Math.max(0, savingsPercent)) / 100;
    return baseEnergyKwh * (1 - reductionFactor);
  }
}

export const calculationService = new CalculationService();
