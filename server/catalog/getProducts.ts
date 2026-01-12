import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND } from '@/shared/mock/products';

import { filterProducts } from '@/shared/lib/catalog/catalogFilters';
import { sortProducts } from '@/shared/lib/catalog/catalogSorter';
import { paginateProducts } from '@/shared/lib/catalog/catalogPaginator';
import { getUniqueCategories, getUniqueYears } from '@/shared/lib/catalog/catalogFilters';

import type { CatalogQuery } from '@/shared/lib/catalog/catalogQuery';

export type CatalogServerResult = {
    items: ReturnType<typeof paginateProducts>['items'];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;

    categories: string[];
    years: number[];
};

export function getProductsServer(brand: string, query: CatalogQuery): CatalogServerResult | null {
    if (!isBrand(brand)) return null;

    const all = PRODUCTS_BY_BRAND[brand];

    const categories = getUniqueCategories(all);
    const years = getUniqueYears(all);

    const filtered = filterProducts(all, {
        q: query.q,
        category: query.category,
        year: query.year,
    });

    const sorted = sortProducts(filtered, query.sort);

    const paginated = paginateProducts(sorted, query.page, query.limit);

    return {
        items: paginated.items,
        total: paginated.total,
        totalPages: paginated.totalPages,
        currentPage: paginated.currentPage,
        limit: query.limit,

        categories,
        years,
    };
}
