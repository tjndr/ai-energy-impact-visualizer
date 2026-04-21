export class ForecastService {
  project(currentValue: number, growthRate: number, years: number): Array<{ year: number; value: number; lower: number; upper: number }> {
    return Array.from({ length: years }, (_, index) => {
      const year = index + 1;
      const value = currentValue * (1 + growthRate) ** year;
      const confidence = growthRate * year;
      return {
        year,
        value,
        lower: value * (1 - confidence),
        upper: value * (1 + confidence),
      };
    });
  }
}

export const forecastService = new ForecastService();
