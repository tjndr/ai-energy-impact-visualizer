import express from 'express';
import cors from 'cors';
import { modelsRouter } from './api/routes/models.js';
import { regionsRouter } from './api/routes/regions.js';
import { scenariosRouter } from './api/routes/scenarios.js';
import { calculationsRouter } from './api/routes/calculations.js';
import { solutionsRouter } from './api/routes/solutions.js';
import { reportsRouter } from './api/routes/reports.js';
import { errorHandler } from './middleware/errorHandler.js';
import { inMemoryCache } from './middleware/cache.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', inMemoryCache);

app.use('/api/models', modelsRouter);
app.use('/api/regions', regionsRouter);
app.use('/api/scenarios', scenariosRouter);
app.use('/api/calculations', calculationsRouter);
app.use('/api/solutions', solutionsRouter);
app.use('/api/reports', reportsRouter);
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT ?? 5000);
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}
