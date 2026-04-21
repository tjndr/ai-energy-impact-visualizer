import { Router } from 'express';
import { reportService } from '../../services/reportService.js';
import { calculationService } from '../../services/calculationService.js';

export const reportsRouter = Router();

const reports = new Map<string, ReturnType<typeof reportService.generateJson>>();

reportsRouter.post('/generate', (req, res, next) => {
  try {
    const result = calculationService.calculateScenario(req.body);
    const report = reportService.generateJson(result);
    reports.set(report.id, report);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
});

reportsRouter.get('/:id', (req, res) => {
  const report = reports.get(req.params.id);
  if (!report) {
    res.status(404).json({ error: 'Report not found' });
    return;
  }
  res.json(report);
});
