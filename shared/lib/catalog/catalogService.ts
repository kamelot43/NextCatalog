import type {Product} from "@/shared/mock/products";
import type {CatalogSort} from "@/shared/lib/catalog/catalogQuery";

import { FilterOptions, filterProducts, getUniqueCategories, getUniqueYears } from './catalogFilters';
import { sortProducts } from './catalogSorter';
import { paginateProducts, PaginationResult } from './catalogPaginator';

export type CatalogOptions = FilterOptions & {
    sort?: CatalogSort;
    page?: number;
    limit?: number;
};

export function getCatalogData(
    products: Product[],
    options: CatalogOptions
): {
    paginated: PaginationResult;
    categories: string[];
    years: number[];
} {
    // 1. Фильтрация
    const filtered = filterProducts(products, options);

    // 2. Сортировка
    const sorted = sortProducts(filtered, options.sort || 'year-desc');

    // 3. Пагинация
    const paginated = paginateProducts(
        sorted,
        options.page || 1,
        options.limit || 5
    );

    // 4. Метаданные для фильтров
    const categories = getUniqueCategories(products);
    const years = getUniqueYears(products);

    return {
        paginated,
        categories,
        years,
    };
}
