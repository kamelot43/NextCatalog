import { getProductBySlug } from '@/shared/api/products';
import { ProductDetails } from '@/ui/product/ProductDetails/ProductDetails';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}): Promise<Metadata> {
    const { brand, slug } = await params;
    const product = await getProductBySlug(brand, slug);

    if (!product) {
        return {
              title: 'Product not found — NextCatalog',
              description: 'Запрошенный товар не найден.',
        };
    }

      return {
        title: `${product.title} — ${brand} — NextCatalog`,
        description: `${product.title}: ${product.year}, ${product.category}. Цена: ${product.price.toLocaleString(
          'ru-RU'
        )} ${product.currency}.`,
      };
}

export default async function ProductPage({
  params,
}: {
    params: Promise<{ brand: string; slug: string }>;
}) {
    const { brand, slug } = await params;
    const product = await getProductBySlug(brand, slug);

    if (!product ) {
        notFound();
    }

    return <ProductDetails brand={brand} product={product} />;
}
