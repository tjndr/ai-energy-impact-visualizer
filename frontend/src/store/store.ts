import { configureStore } from '@reduxjs/toolkit';
import scenarioReducer from './slices/scenarioSlice';
import dataReducer from './slices/dataSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    scenario: scenarioReducer,
    data: dataReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
