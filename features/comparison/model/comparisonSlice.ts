import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ComparisonState = {
    ids: string[];
    max: number;
};

const initialState: ComparisonState = {
    ids: [],
    max: 4,
};

const comparisonSlice = createSlice({
    name: 'comparison',
    initialState,
    reducers: {
        toggleCompare(state, action: PayloadAction<string>) {
            const id = action.payload;

            if (state.ids.includes(id)) {
                state.ids = state.ids.filter((x) => x !== id);
                return;
            }

            if (state.ids.length >= state.max) return; // лимит
            state.ids.push(id);
        },

        removeCompare(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.ids = state.ids.filter((x) => x !== id);
        },

        clearCompare(state) {
            state.ids = [];
        },

        hydrateCompare(state, action: PayloadAction<string[]>) {
            // На всякий случай чистим мусор
            const incoming = action.payload.filter((x) => typeof x === 'string');
            state.ids = incoming.slice(0, state.max);
        },
    },
});

export const { toggleCompare, removeCompare, clearCompare, hydrateCompare } =
    comparisonSlice.actions;

export const comparisonReducer = comparisonSlice.reducer;
