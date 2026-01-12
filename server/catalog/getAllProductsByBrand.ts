import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND } from '@/shared/mock/products';
import type { Product } from '@/shared/mock/products';

export function getAllProductsByBrandServer(brand: string): Product[] | null {
    if (!isBrand(brand)) return null;
    return PRODUCTS_BY_BRAND[brand];
}
