import styles from './ComparisonPage.module.css';
import { getProducts } from '@/shared/api/products';
import { ComparisonTable } from '@/ui/comparison/ComparisonTable/ComparisonTable';

export default async function ComparisonPage({
   params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;
    const products = await getProducts(brand);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Comparison</h1>
            <ComparisonTable brand={brand} products={products} />
        </section>
    );
}
