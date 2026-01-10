import type {Product} from "@/shared/mock/products";

export type PaginationResult = {
    items: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
    startIndex: number;
    endIndex: number;
};

export function paginateProducts(
    products: Product[],
    page: number = 1,
    limit: number = 5
): PaginationResult {
    const total = products.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Корректируем номер страницы, если он вне диапазона
    const currentPage = Math.max(1, Math.min(page, totalPages));

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const items = products.slice(startIndex, endIndex);

    return {
        items,
        total,
        totalPages,
        currentPage,
        startIndex,
        endIndex,
    };
}
