import { Router } from 'express';
import { dataService } from '../../services/dataService.js';
import { forecastService } from '../../services/forecastService.js';

export const regionsRouter = Router();

regionsRouter.get('/', (_req, res) => {
  res.json(dataService.getRegions());
});

regionsRouter.get('/:code', (req, res) => {
  const region = dataService.getRegionByCode(req.params.code);
  if (!region) {
    res.status(404).json({ error: 'Region not found' });
    return;
  }
  res.json(region);
});

regionsRouter.get('/:code/projections', (req, res) => {
  const region = dataService.getRegionByCode(req.params.code);
  if (!region) {
    res.status(404).json({ error: 'Region not found' });
    return;
  }

  const current = region.population * region.currentAIAdoption;
  res.json({ region: region.code, projections: forecastService.project(current, 0.2, 10) });
});
