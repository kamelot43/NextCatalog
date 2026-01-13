import type { Product } from '@/shared/mock/products';

export function selectProductsByIds(all: Product[], ids: string[]) {
  const set = new Set(ids);
  return all.filter((p) => set.has(p.id));
}
