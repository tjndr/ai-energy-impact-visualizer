export const secondsPerDay = 86400;
export const wattHoursPerKwh = 1000;

export const kwhToMwh = (kwh: number): number => kwh / 1000;
export const kwhToGwh = (kwh: number): number => kwh / 1_000_000;
export const kwhToTwh = (kwh: number): number => kwh / 1_000_000_000;
