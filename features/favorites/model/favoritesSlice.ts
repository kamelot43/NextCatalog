import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = {
    ids: string[];
};

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.ids.includes(id)) {
                state.ids = state.ids.filter((x) => x !== id);
            } else {
                state.ids.push(id);
            }
        },
        clearFavorites(state) {
            state.ids = [];
        },
        hydrateFavorites(state, action: PayloadAction<string[]>) {
            state.ids = action.payload;
        },
    },
});

export const { toggleFavorite, clearFavorites, hydrateFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
