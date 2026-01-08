import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BrandKey = string;

type ComparisonState = {
    idsByBrand: Record<BrandKey, string[]>;
    max: number;
};

const initialState: ComparisonState = {
    idsByBrand: {},
    max: 4,
};

type TogglePayload = { brand: BrandKey; id: string };
type HydratePayload = Record<BrandKey, string[]>;

const comparisonSlice = createSlice({
    name: 'comparison',
    initialState,
    reducers: {
        toggleCompare(state, action: PayloadAction<TogglePayload>) {
            const { brand, id } = action.payload;

            const ids = state.idsByBrand[brand] ?? [];

            if (ids.includes(id)) {
                state.idsByBrand[brand] = ids.filter((x) => x !== id);
                return;
            }

            if (ids.length >= state.max) return;

            state.idsByBrand[brand] = [...ids, id];
        },

        removeCompare(state, action: PayloadAction<TogglePayload>) {
            const { brand, id } = action.payload;
            const ids = state.idsByBrand[brand] ?? [];
            state.idsByBrand[brand] = ids.filter((x) => x !== id);
        },

        clearCompare(state, action: PayloadAction<{ brand: BrandKey }>) {
            const { brand } = action.payload;
            state.idsByBrand[brand] = [];
        },

        clearAllCompare(state) {
            state.idsByBrand = {};
        },

        hydrateCompare(state, action) {
            const incoming = action.payload ?? {};
            const out: Record<string, string[]> = {};

            for (const [brand, ids] of Object.entries(incoming)) {
                out[brand] = (ids ?? []).slice(0, state.max);
            }

            state.idsByBrand = out;
        }
    },
});

export const {
    toggleCompare,
    removeCompare,
    clearCompare,
    clearAllCompare,
    hydrateCompare,
} = comparisonSlice.actions;

export const comparisonReducer = comparisonSlice.reducer;
