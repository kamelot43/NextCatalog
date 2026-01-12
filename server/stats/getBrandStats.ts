import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND } from '@/shared/mock/products';

export type BrandStats = {
    total: number;
    categoriesCount: number;
    yearMin: number | null;
    yearMax: number | null;
};

export function getBrandStatsServer(brand: string): BrandStats | null {
    if (!isBrand(brand)) return null;

    const items = PRODUCTS_BY_BRAND[brand] ?? [];
    const total = items.length;

    const categoriesCount = new Set(items.map((p) => p.category)).size;

    const years = items.map((p) => p.year).filter((y) => Number.isFinite(y));
    const yearMin = years.length ? Math.min(...years) : null;
    const yearMax = years.length ? Math.max(...years) : null;

    return { total, categoriesCount, yearMin, yearMax };
}
