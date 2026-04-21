import modelsData from '../../../data/models.json' with { type: 'json' };
import regionsData from '../../../data/regions.json' with { type: 'json' };
import solutionsData from '../../../data/solutions.json' with { type: 'json' };
import type { AIModel, Region, Solution } from '../types.js';

export class DataService {
  getModels(): AIModel[] {
    return modelsData.models as AIModel[];
  }

  getModelById(id: string): AIModel | undefined {
    return this.getModels().find((model) => model.id === id);
  }

  getRegions(): Region[] {
    return regionsData.regions as Region[];
  }

  getRegionByCode(code: string): Region | undefined {
    return this.getRegions().find((region) => region.code === code.toUpperCase());
  }

  getSolutions(): Solution[] {
    return solutionsData.solutions as Solution[];
  }
}

export const dataService = new DataService();
