import type {Product} from "@/shared/mock/products";
import type {CatalogSort} from "@/shared/lib/catalog/catalogQuery";

export function sortProducts(
    products: Product[],
    sortBy: CatalogSort
): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);

        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);

        case 'power-desc':
            return sorted.sort((a, b) => b.specs.powerHp - a.specs.powerHp);

        case 'year-desc':
        default:
            return sorted.sort((a, b) => b.year - a.year);
    }
}
