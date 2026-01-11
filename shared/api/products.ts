import { notFound } from 'next/navigation';
import { isBrand } from '@/shared/config/brands';
import { PRODUCTS_BY_BRAND, type Product } from '@/shared/mock/products';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts(brand: string): Promise<Product[]> {
    await delay(150);
    if (!isBrand(brand)) notFound();

    return PRODUCTS_BY_BRAND[brand];
}

export async function getProductBySlug(
    brand: string,
    slug: string
): Promise<Product> {
    await delay(150);
    if (!isBrand(brand)) notFound();

    const product = PRODUCTS_BY_BRAND[brand].find((p) => p.slug === slug);
    if (!product) notFound();
    return product;
}

export async function getProductById(
    brand: string,
    id: string
): Promise<Product> {
    await delay(50);
    if (!isBrand(brand)) notFound();

    const product = PRODUCTS_BY_BRAND[brand].find((p) => p.id === id);
    if (!product) notFound();
    return product;
}
