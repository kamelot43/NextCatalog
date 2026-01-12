import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './BrandHome.module.css';
import { isBrand } from '@/shared/config/brands';
import { Suspense } from 'react';
import { BrandStats } from '@/ui/brand/BrandStats/BrandStats';
import {BrandStatsSkeleton} from "@/ui/skeletons/BrandStatsSkeleton/BrandStatsSkeleton";

function toBrandTitle(brand: string) {
    return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string }>;
}): Promise<Metadata> {
    const { brand } = await params;
    if (!isBrand(brand)) return { title: 'Brand' };
    const t = toBrandTitle(brand);

    return {
        title: `${t} • Home`,
        description: `Entry points for ${t}: catalog, favorites, comparison and account.`,
    };
}

export default async function BrandHome({
    params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;
    if (!isBrand(brand)) return notFound();

    const base = `/brand/${brand}`;
    const title = toBrandTitle(brand);

    return (
        <main className={styles.page}>
            <Link href="/" className={styles.allBrands}>
                ← All brands
            </Link>
            <section className={styles.hero}>
                <h1 className={styles.h1}>{title}</h1>
                <p className={styles.subtitle}>
                    Jump into the catalog, check favorites, compare models, or update your account settings.
                </p>

                <div className={styles.actions}>
                    <Link className={styles.primaryBtn} href={`${base}/catalog`}>
                        Open catalog →
                    </Link>
                    <Link className={styles.secondaryBtn} href={`${base}/favorites`}>
                        Favorites
                    </Link>
                    <Link className={styles.secondaryBtn} href={`${base}/comparison`}>
                        Comparison
                    </Link>
                    <Link className={styles.secondaryBtn} href={`${base}/account`}>
                        Account
                    </Link>
                </div>
            </section>

            <Suspense fallback={<BrandStatsSkeleton />}>
                <BrandStats brand={brand} />
            </Suspense>

            <section className={styles.section}>
                <h2 className={styles.h2}>Tips</h2>
                <ul className={styles.list}>
                    <li>Add cars to favorites from catalog cards.</li>
                    <li>Compare up to 4 cars at once.</li>
                    <li>Currency and catalog defaults are stored in cookies.</li>
                </ul>
            </section>
        </main>
    );
}
