import { configureStore, type PreloadedState } from '@reduxjs/toolkit';
import { favoritesReducer } from '@/features/favorites/model/favoritesSlice';
import { comparisonReducer } from '@/features/comparison/model/comparisonSlice';

export const makeStore = (preloadedState?: PreloadedState<RootState>) =>
    configureStore({
        reducer: {
            favorites: favoritesReducer,
            comparison: comparisonReducer,
        },
        preloadedState,
    });


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
