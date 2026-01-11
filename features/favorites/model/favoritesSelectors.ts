import type { RootState } from '@/shared/store/store';

export const selectFavoriteIdsByBrand = (brand: string) => (state: RootState) =>
    state.favorites.idsByBrand[brand] ?? [];


export const selectIsProductInFavorites = (brand: string, productId: string) =>
    (state: RootState) => (state.favorites.idsByBrand[brand] ?? []).includes(productId);


export const selectFavoritesCountByBrand = (brand: string) =>
    (state: RootState) => (state.favorites.idsByBrand[brand] ?? []).length;
