'use client';

import Link from 'next/link';
import styles from './FavoritesList.module.css';
import type { Product } from '@/shared/mock/products';
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';

import { useDispatch } from 'react-redux';
import { useTransition } from 'react';
import type { AppDispatch } from '@/shared/store/store';

import { hydrateFavorites } from '@/features/favorites/model/favoritesSlice';
import { toggleFavoriteCookie, clearFavoritesCookie } from '@/server/actions/preferences';

type Props = {
    brand: string;
    products: Product[];
};

export function FavoritesList({ brand, products }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [pending, startTransition] = useTransition();

    if (products.length === 0) {
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

    return (
        <>
            <div className={styles.toolbar}>
                <div className={styles.count}>
                    Saved: <strong>{products.length}</strong>
                </div>

                <button
                    className={styles.clear}
                    disabled={pending}
                    onClick={() => {
                        startTransition(async () => {
                            const res = await clearFavoritesCookie(brand);
                            dispatch(hydrateFavorites(res.map));
                        });
                    }}
                >
                    Clear all
                </button>
            </div>

            <div className={styles.grid}>
                {products.map((p) => (
                    <div key={p.id} className={styles.cardWrap}>
                        <ProductCard brand={brand} product={p} />

                        <button
                            className={styles.remove}
                            disabled={pending}
                            onClick={() => {
                                startTransition(async () => {
                                    // remove = toggle
                                    const res = await toggleFavoriteCookie(brand, p.id);
                                    dispatch(hydrateFavorites(res.map));
                                });
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
