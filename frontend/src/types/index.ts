export * from './models';
export * from './scenario';
export * from './energy';

export interface Region {
  code: string;
  name: string;
  population: number;
  gdp: number;
  developmentLevel: 'high' | 'middle' | 'low';
  currentAIAdoption: number;
  electricityPrice: number;
  carbonIntensity: number;
  renewablePercentage: number;
}

export interface Solution {
  id: string;
  category: string;
  name: string;
  description: string;
  energySavingsPercent: number;
  implementationCost: number;
  timeToImplement: string;
  researchPapers: string[];
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  year: number;
  url: string;
  citations: number;
  topics: string[];
}
