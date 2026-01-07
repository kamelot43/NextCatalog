import { configureStore } from '@reduxjs/toolkit';
import { brandReducer } from '@/entities/brand/model/brandSlice';

export const store = configureStore({
    reducer: {
        brand: brandReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
