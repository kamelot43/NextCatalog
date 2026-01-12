import type { RootState } from '@/shared/store/store';

export const selectCompareCountByBrand = (brand: string) => (s: RootState) =>
    (s.comparison.idsByBrand[brand]?.length ?? 0);


export const selectIsProductInComparison = (brand: string, productId: string) =>
    (state: RootState) => (state.comparison.idsByBrand[brand] ?? []).includes(productId);


export const selectIsComparisonLimitReached = (brand: string) =>
    (state: RootState) => {
        const ids = state.comparison.idsByBrand[brand] ?? [];
        return ids.length >= state.comparison.max;
    };


export const selectComparisonMaxLimit = (state: RootState) => state.comparison.max;
