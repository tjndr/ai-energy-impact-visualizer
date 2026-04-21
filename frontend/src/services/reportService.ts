import type { DashboardMetrics } from '../types';

export function downloadJsonReport(metrics: DashboardMetrics): void {
  const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ai-energy-report.json';
  link.click();
  URL.revokeObjectURL(url);
}
