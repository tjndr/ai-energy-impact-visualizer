import { Router } from 'express';
import { calculationService } from '../../services/calculationService.js';
import { carbonService } from '../../services/carbonService.js';

export const calculationsRouter = Router();

calculationsRouter.post('/tokens', (req, res) => {
  const { globalAdoptionRate, dailyUsageMinutes, tokensPerMinute } = req.body as { globalAdoptionRate: number; dailyUsageMinutes: number; tokensPerMinute?: number };
  res.json(calculationService.calculateTokens(globalAdoptionRate, dailyUsageMinutes, tokensPerMinute));
});

calculationsRouter.post('/energy', (req, res) => {
  res.json(calculationService.calculateEnergy(req.body));
});

calculationsRouter.post('/cost', (req, res) => {
  const { energyKwh, electricityRatePerKwh, tokensPerDay, tokensPerSecond, gpuHourlyCost } = req.body as { energyKwh: number; electricityRatePerKwh: number; tokensPerDay: number; tokensPerSecond: number; gpuHourlyCost: number };
  res.json({ totalCostUsd: calculationService.calculateCost(energyKwh, electricityRatePerKwh, tokensPerDay, tokensPerSecond, gpuHourlyCost) });
});

calculationsRouter.post('/carbon', (req, res) => {
  const { energyKwh, carbonIntensity } = req.body as { energyKwh: number; carbonIntensity: number };
  res.json({ co2Grams: carbonService.calculateCarbonGrams(energyKwh, carbonIntensity) });
});
