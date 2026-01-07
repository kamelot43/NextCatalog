import { PRODUCTS_BY_BRAND, type Product } from '@/shared/mock/products';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts(brand: string): Promise<Product[]> {
    await delay(150);

    return PRODUCTS_BY_BRAND[brand] ?? [];
}

export async function getProductBySlug(
    brand: string,
    slug: string
): Promise<Product | null> {
    await delay(150);

    const products = PRODUCTS_BY_BRAND[brand] ?? [];
    return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(
    brand: string,
    id: string
): Promise<Product | null> {
    await delay(50);

    const products = PRODUCTS_BY_BRAND[brand] ?? [];
    return products.find((p) => p.id === id) ?? null;
}
