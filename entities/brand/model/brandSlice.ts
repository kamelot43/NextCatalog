import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BrandState = {
  current: string | null;
};

const initialState: BrandState = {
  current: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrand(state, action: PayloadAction<string>) {
      state.current = action.payload;
    },
  },
});

export const { setBrand } = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
