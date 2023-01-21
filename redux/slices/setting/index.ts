import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SETTING } from '../../../constants/slicer.constant';
import { RootResources } from '../../../types/services/root';

export interface StateInterface {
  setting: RootResources.getSetting.data | null;
}

export interface LoadingInterface {
  loading: boolean;
}

const initialState: StateInterface & LoadingInterface = {
  setting: null,
  loading: false,
};
export const indexSlice = createSlice({
  name: SETTING,
  initialState,
  reducers: {
    addSetting: (state, action: PayloadAction<RootResources.getSetting.data>) => {
      state.setting = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      if (state.loading !== action.payload) {
        state.loading = action.payload;
      }
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      if (state.setting) {
        state.setting.site_name = action.payload;
      }
    },
    clearSetting: (state) => {
      state.setting = null;
    },
  },
});

export const { addSetting, changeTitle, setLoading } = indexSlice.actions;
export default indexSlice.reducer;
