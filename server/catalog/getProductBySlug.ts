import type { Product } from '@/shared/mock/products';
import { getProductBySlugCached } from '@/server/data/products';

export async function getProductBySlugServer(brand: string, slug: string): Promise<Product | null> {
    return getProductBySlugCached(brand, slug);
}
