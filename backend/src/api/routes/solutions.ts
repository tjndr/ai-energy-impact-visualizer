import { Router } from 'express';
import { dataService } from '../../services/dataService.js';
import { calculationService } from '../../services/calculationService.js';

export const solutionsRouter = Router();

solutionsRouter.get('/', (_req, res) => {
  res.json(dataService.getSolutions());
});

solutionsRouter.post('/impact', (req, res) => {
  const { baseEnergyKwh, solutionId } = req.body as { baseEnergyKwh: number; solutionId: string };
  const solution = dataService.getSolutions().find((item) => item.id === solutionId);
  if (!solution) {
    res.status(404).json({ error: 'Solution not found' });
    return;
  }

  const adjustedEnergy = calculationService.calculateSolutionImpact(baseEnergyKwh, solution.energySavingsPercent);
  res.json({ solutionId, baseEnergyKwh, adjustedEnergy, savedEnergyKwh: baseEnergyKwh - adjustedEnergy });
});
