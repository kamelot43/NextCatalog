import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND } from '@/shared/mock/products';

export function getProductBySlugServer(brand: string, slug: string) {
    if (!isBrand(brand)) return null;
    return PRODUCTS_BY_BRAND[brand].find((p) => p.slug === slug) ?? null;
}
