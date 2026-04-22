import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardMetrics } from '../../types';

const initialState: DashboardMetrics = {
  tokensPerSecond: 0,
  energyKwhPerDay: 0,
  costUsdPerDay: 0,
  carbonGramsPerDay: 0,
  projections: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMetrics(_state, action: PayloadAction<DashboardMetrics>) {
      return action.payload;
    },
  },
});

export const { setMetrics } = dataSlice.actions;
export default dataSlice.reducer;
