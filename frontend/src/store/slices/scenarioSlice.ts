import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ScenarioInput } from '../../types';
import { defaultScenario } from '../../utils/calculations';

const scenarioSlice = createSlice({
  name: 'scenario',
  initialState: defaultScenario(),
  reducers: {
    setScenario(_state, action: PayloadAction<ScenarioInput>) {
      return action.payload;
    },
    updateScenarioField(state, action: PayloadAction<{ key: keyof ScenarioInput; value: number }>) {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setScenario, updateScenarioField } = scenarioSlice.actions;
export default scenarioSlice.reducer;
