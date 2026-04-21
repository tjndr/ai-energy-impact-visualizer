import type { CalculationResult } from '../types.js';

export class ReportService {
  generateJson(result: CalculationResult): { id: string; generatedAt: string; format: 'json'; payload: CalculationResult } {
    return {
      id: crypto.randomUUID(),
      generatedAt: new Date().toISOString(),
      format: 'json',
      payload: result,
    };
  }
}

export const reportService = new ReportService();
