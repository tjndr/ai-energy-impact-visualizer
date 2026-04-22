export interface Projection {
  year: number;
  value: number;
  lower: number;
  upper: number;
}

export interface DashboardMetrics {
  tokensPerSecond: number;
  energyKwhPerDay: number;
  costUsdPerDay: number;
  carbonGramsPerDay: number;
  projections: Projection[];
}
