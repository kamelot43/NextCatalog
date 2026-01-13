import { unstable_cache } from 'next/cache';
import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND } from '@/shared/mock/products';
import type { Product } from '@/shared/mock/products';

export const getAllProductsByBrandCached = unstable_cache(
  async (brand: string): Promise<Product[] | null> => {
    if (!isBrand(brand)) return null;
    return PRODUCTS_BY_BRAND[brand];
  },
  ['all-products-by-brand'], // базовый ключ
  {
    revalidate: 60, // ISR: обновлять раз в 60 секунд
    tags: ['products'],
  },
);

export const getProductBySlugCached = unstable_cache(
  async (brand: string, slug: string): Promise<Product | null> => {
    if (!isBrand(brand)) return null;
    return PRODUCTS_BY_BRAND[brand].find((p) => p.slug === slug) ?? null;
  },
  ['product-by-slug'],
  {
    revalidate: 60,
    tags: ['products'],
  },
);
