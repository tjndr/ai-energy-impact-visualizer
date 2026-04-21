import { Router } from 'express';
import { calculationService } from '../../services/calculationService.js';
import type { Scenario } from '../../types.js';

export const scenariosRouter = Router();

const scenarios = new Map<string, Scenario>();

scenariosRouter.get('/', (_req, res) => {
  res.json(Array.from(scenarios.values()));
});

scenariosRouter.post('/', (req, res) => {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const scenario: Scenario = {
    id,
    name: req.body.name ?? `Scenario ${id.slice(0, 8)}`,
    input: req.body.input,
    createdAt: now,
    updatedAt: now,
  };
  scenarios.set(id, scenario);
  res.status(201).json(scenario);
});

scenariosRouter.get('/:id', (req, res) => {
  const scenario = scenarios.get(req.params.id);
  if (!scenario) {
    res.status(404).json({ error: 'Scenario not found' });
    return;
  }
  res.json(scenario);
});

scenariosRouter.put('/:id', (req, res) => {
  const existing = scenarios.get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Scenario not found' });
    return;
  }

  const updated = {
    ...existing,
    ...req.body,
    input: req.body.input ?? existing.input,
    updatedAt: new Date().toISOString(),
  };
  scenarios.set(updated.id, updated);
  res.json(updated);
});

scenariosRouter.post('/:id/calculate', (req, res, next) => {
  try {
    const scenario = scenarios.get(req.params.id);
    if (!scenario) {
      res.status(404).json({ error: 'Scenario not found' });
      return;
    }

    const result = calculationService.calculateScenario({
      ...scenario.input,
      modelId: req.body.modelId ?? 'gpt4-128k',
      regionCode: req.body.regionCode ?? 'US',
      gpuHourlyCost: req.body.gpuHourlyCost ?? 3,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

scenariosRouter.delete('/:id', (req, res) => {
  const deleted = scenarios.delete(req.params.id);
  res.json({ deleted });
});
