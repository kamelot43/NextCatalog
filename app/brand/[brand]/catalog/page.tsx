import styles from './CatalogPage.module.css';
import { getProducts } from '@/shared/api/products';
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';

export default async function CatalogPage({
  params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;
    const products = await getProducts(brand);

    return (
        <section>
            <h1>Catalog</h1>
            {products.length === 0 ? (
                <p className={styles.empty}>No products for this brand.</p>
            ) : (
                <div className={styles.grid}>
                    {products.map((p) => (
                        <ProductCard key={p.id} brand={brand} product={p} />
                    ))}
                </div>
            )}
        </section>
    );
}
