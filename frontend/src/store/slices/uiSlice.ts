import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  selectedRegion: string;
  reportModalOpen: boolean;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { selectedRegion: 'US', reportModalOpen: false } as UiState,
  reducers: {
    setSelectedRegion(state, action: PayloadAction<string>) {
      state.selectedRegion = action.payload;
    },
    setReportModalOpen(state, action: PayloadAction<boolean>) {
      state.reportModalOpen = action.payload;
    },
  },
});

export const { setSelectedRegion, setReportModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
