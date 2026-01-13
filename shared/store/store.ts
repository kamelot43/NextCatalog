import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '@/features/favorites/model/favoritesSlice';
import { comparisonReducer } from '@/features/comparison/model/comparisonSlice';

type FavoritesState = ReturnType<typeof favoritesReducer>;
type ComparisonState = ReturnType<typeof comparisonReducer>;

export type { FavoritesState, ComparisonState };

export interface RootState {
  favorites: FavoritesState;
  comparison: ComparisonState;
}

export const makeStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
      comparison: comparisonReducer,
    },
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
