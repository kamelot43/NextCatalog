import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isBrand } from '@/shared/config/brands';
import { getProductBySlugServer } from '@/server/catalog/getProductBySlug';
import { ProductDetails } from '@/ui/product/ProductDetails/ProductDetails';

function toBrandTitle(brand: string) {
    return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export const revalidate = 60;

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string; slug: string }>;
}): Promise<Metadata> {
    const { brand, slug } = await params;

    if (!isBrand(brand)) return { title: 'Not found' };

    const product = await getProductBySlugServer(brand, slug);
    if (!product) return { title: 'Not found' };

    const brandTitle = toBrandTitle(brand);

    return {
        title: `${product.title} • ${brandTitle}`,
        description: `Details for ${product.title} (${brandTitle}).`,
    };
}

export default async function ProductPage({
  params,
}: {
    params: Promise<{ brand: string; slug: string }>;
}) {
    const { brand, slug } = await params;

    if (!isBrand(brand)) return notFound();

    const product = await getProductBySlugServer(brand, slug);
    if (!product) return notFound();

    return <ProductDetails brand={brand} product={product} />;
}
