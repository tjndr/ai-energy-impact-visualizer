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
    updateScenarioField(state, action: PayloadAction<Partial<ScenarioInput>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setScenario, updateScenarioField } = scenarioSlice.actions;
export default scenarioSlice.reducer;
