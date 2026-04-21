export interface AIModel {
  id: string;
  name: string;
  organization: string;
  parameters: number;
  tokensPerSecond: number;
  flopsPerToken: number;
  memoryPerToken: number;
  energyPerToken: number;
  architecture: string;
  contextWindow: number;
}
