import styles from './ComparisonPage.module.css';
import {getProducts} from '@/shared/api/products';
import {ComparisonTable} from '@/ui/comparison/ComparisonTable/ComparisonTable';
import type {Metadata} from 'next';

function toBrandTitle(brand: string) {
    return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string }>;
}): Promise<Metadata> {

    const {brand} = await params;
    const brandTitle = toBrandTitle(brand);

    return {
        title: `${brandTitle} • Comparison`,
        description: `Compare ${brandTitle} cars side-by-side: price, year, power and specs.`,
    };
}

export default async function ComparisonPage({
    params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const {brand} = await params;
    const products = await getProducts(brand);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Comparison</h1>
            <ComparisonTable brand={brand} products={products}/>
        </section>
    );
}
