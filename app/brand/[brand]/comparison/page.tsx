import styles from './ComparisonPage.module.css';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { isBrand } from '@/shared/config/brands';

import { ComparisonTable } from '@/ui/comparison/ComparisonTable/ComparisonTable';

import { getCompareMap } from '@/server/actions/preferences';
import { getAllProductsByBrandServer } from '@/server/catalog/getAllProductsByBrand';
import { selectProductsByIds } from '@/server/catalog/selectProductsByIds';

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
    const { brand } = await params;
    if (!isBrand(brand)) return notFound();

    const compareMap = await getCompareMap();
    const ids = compareMap[brand] ?? [];

    const all = getAllProductsByBrandServer(brand);
    if (!all) return notFound();

    const products = selectProductsByIds(all, ids);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Comparison</h1>
            <ComparisonTable brand={brand} products={products}/>
        </section>
    );
}
