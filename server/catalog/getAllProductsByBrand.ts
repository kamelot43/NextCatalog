import type { Product } from '@/shared/mock/products';
import { getAllProductsByBrandCached } from '@/server/data/products';

export async function getAllProductsByBrandServer(brand: string): Promise<Product[] | null> {
    return getAllProductsByBrandCached(brand);
}
