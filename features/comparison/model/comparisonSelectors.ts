import type { RootState } from '@/shared/store/store';

export const selectComparisonIdsByBrand = (brand: string) => (state: RootState) =>
    state.comparison.idsByBrand[brand] ?? [];


export const selectIsProductInComparison = (brand: string, productId: string) =>
    (state: RootState) => (state.comparison.idsByBrand[brand] ?? []).includes(productId);


export const selectIsComparisonLimitReached = (brand: string) =>
    (state: RootState) => {
        const ids = state.comparison.idsByBrand[brand] ?? [];
        return ids.length >= state.comparison.max;
    };


export const selectComparisonMaxLimit = (state: RootState) => state.comparison.max;
