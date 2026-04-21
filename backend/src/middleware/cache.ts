import type { Request, Response, NextFunction } from 'express';

const cache = new Map<string, unknown>();

export function inMemoryCache(req: Request, res: Response, next: NextFunction): void {
  if (req.method !== 'GET') {
    next();
    return;
  }

  const key = req.originalUrl;
  if (cache.has(key)) {
    res.json(cache.get(key));
    return;
  }

  const originalJson = res.json.bind(res);
  res.json = (body: unknown) => {
    cache.set(key, body);
    return originalJson(body);
  };

  next();
}
