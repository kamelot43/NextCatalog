import { getProductBySlug } from '@/shared/api/products';
import { ProductDetails } from '@/ui/product/ProductDetails/ProductDetails';

export default async function ProductPage({
  params,
}: {
    params: Promise<{ brand: string; slug: string }>;
}) {
    const { brand, slug } = await params;
    const product = await getProductBySlug(brand, slug);

    if (!product) {
        return <div>Product not found</div>;
    }

    return <ProductDetails brand={brand} product={product} />;
}
