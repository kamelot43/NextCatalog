import type { Product } from '@/shared/mock/products';

export type ProductsResponse = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type GetProductsArgs = {
  brand: string;
  q?: string;
  category?: string;
  year?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

export async function getProducts(args: GetProductsArgs): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (args.q) params.set('q', args.q);
  if (args.category) params.set('category', args.category);
  if (args.year) params.set('year', String(args.year));
  if (args.sort) params.set('sort', args.sort);
  if (args.page) params.set('page', String(args.page));
  if (args.limit) params.set('limit', String(args.limit));

  const res = await fetch(`/api/brand/${args.brand}/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status}`);
  }

  return res.json();
}

export async function getProductBySlug(brand: string, slug: string): Promise<Product> {
  const res = await fetch(`/api/brand/${brand}/products/${slug}`);
  if (res.status === 404) {
    throw new Error('NOT_FOUND');
  }
  if (!res.ok) {
    throw new Error(`Failed to load product: ${res.status}`);
  }
  return res.json();
}
