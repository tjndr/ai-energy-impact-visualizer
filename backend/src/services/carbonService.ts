export class CarbonService {
  calculateCarbonGrams(energyKwh: number, carbonIntensityGramsPerKwh: number): number {
    return energyKwh * carbonIntensityGramsPerKwh;
  }
}

export const carbonService = new CarbonService();
