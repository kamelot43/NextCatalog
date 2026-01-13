import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BrandKey = string;

type FavoritesState = {
  idsByBrand: Record<BrandKey, string[]>;
};

const initialState: FavoritesState = {
  idsByBrand: {},
};

type TogglePayload = { brand: BrandKey; id: string };
type HydratePayload = Record<BrandKey, string[]>;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<TogglePayload>) {
      const { brand, id } = action.payload;
      const ids = state.idsByBrand[brand] ?? [];

      if (ids.includes(id)) {
        state.idsByBrand[brand] = ids.filter((x) => x !== id);
        return;
      }

      state.idsByBrand[brand] = [...ids, id];
    },

    removeFavorite(state, action: PayloadAction<TogglePayload>) {
      const { brand, id } = action.payload;
      const ids = state.idsByBrand[brand] ?? [];
      state.idsByBrand[brand] = ids.filter((x) => x !== id);
    },

    clearFavorites(state, action: PayloadAction<{ brand: BrandKey }>) {
      const { brand } = action.payload;
      state.idsByBrand[brand] = [];
    },

    hydrateFavorites(state, action: PayloadAction<HydratePayload>) {
      state.idsByBrand = action.payload ?? {};
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites, hydrateFavorites } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
