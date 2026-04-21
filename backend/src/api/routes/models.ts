import { Router } from 'express';
import { dataService } from '../../services/dataService.js';

export const modelsRouter = Router();

modelsRouter.get('/', (_req, res) => {
  res.json(dataService.getModels());
});

modelsRouter.get('/:id', (req, res) => {
  const model = dataService.getModelById(req.params.id);
  if (!model) {
    res.status(404).json({ error: 'Model not found' });
    return;
  }
  res.json(model);
});
