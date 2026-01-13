import type { Product } from '@/shared/mock/products';

export type FilterOptions = {
  q?: string;
  category?: string;
  year?: number;
};

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  let filtered = [...products];

  if (filters.q) {
    const queryLower = filters.q.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(queryLower));
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.year) {
    filtered = filtered.filter((p) => p.year === filters.year);
  }

  return filtered;
}

// Функция для получения уникальных категорий и годов
export function getUniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function getUniqueYears(products: Product[]): number[] {
  return Array.from(new Set(products.map((p) => p.year))).sort((a, b) => b - a); // новые -> старые
}
