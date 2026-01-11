import type { Brand, Category } from '@/shared/mock/products';

type GetProductImageSrcParams = {
    brand: Brand;
    category?: Category;
    image?: string;
};

export function getProductImageSrc({ brand, category, image }: GetProductImageSrcParams) {
    if (image && image.trim()) return image;

    const safeCategory = (category ?? '').toString().toLowerCase();

    if (!safeCategory) return '/images/placeholder.jpg';

    return `/images/${brand}/${safeCategory}.jpg`;
}
