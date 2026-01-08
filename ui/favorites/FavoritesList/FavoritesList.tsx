'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { RootState } from '@/shared/store/store';
import styles from './FavoritesList.module.css';
import type { Product } from '@/shared/mock/products';
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';

type Props = {
    brand: string;
    products: Product[];
};

export function FavoritesList({ brand, products }: Props) {
    const favIds = useSelector((s: RootState) => s.favorites.ids);

    const favProducts = products.filter((p) => favIds.includes(p.id));

    if (favIds.length === 0) {
        return (
            <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>Favorites is empty</h2>
                <p className={styles.emptyText}>Add products from catalog to see them here.</p>
                <Link className={styles.link} href={`/brand/${brand}/catalog`}>
                    Go to catalog →
                </Link>
            </div>
        );
    }

    if (favProducts.length === 0) {
        return (
            <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>No matching products</h2>
                <p className={styles.emptyText}>
                    Some favorites are not available for this brand.
                </p>
                <Link className={styles.link} href={`/brand/${brand}/catalog`}>
                    Go to catalog →
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {favProducts.map((p) => (
                <ProductCard key={p.id} brand={brand} product={p} />
            ))}
        </div>
    );
}
