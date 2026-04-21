import { DEFAULT_GPU_EFFICIENCY_FLOPS_PER_JOULE, DEFAULT_OVERHEAD_MULTIPLIER, DEFAULT_PUE } from '../utils/constants.js';

export class EnergyService {
  calculateEnergyKwh(tokensPerDay: number, flopsPerToken: number, pueMultiplier = DEFAULT_PUE, overheadMultiplier = DEFAULT_OVERHEAD_MULTIPLIER, gpuEfficiencyFlopsPerJoule = DEFAULT_GPU_EFFICIENCY_FLOPS_PER_JOULE): number {
    const flopsPerDay = tokensPerDay * flopsPerToken;
    const baseEnergyKwh = flopsPerDay / (gpuEfficiencyFlopsPerJoule * 3600 * 1000);
    return baseEnergyKwh * pueMultiplier * overheadMultiplier;
  }
}

export const energyService = new EnergyService();
