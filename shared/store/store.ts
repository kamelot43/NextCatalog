import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '@/features/favorites/model/favoritesSlice';
import { comparisonReducer } from '@/features/comparison/model/comparisonSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        comparison: comparisonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
