'use client';
import { useState, useEffect } from 'react';
import styles from './FavoriteButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import { toggleFavorite } from '@/features/favorites/model/favoritesSlice';
import { selectIsProductInFavorites } from '@/features/favorites/model/favoritesSelectors';

type Props = {
    brand: string;
    productId: string;
};

export function FavoriteButton({ brand, productId }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const isIn = useSelector(selectIsProductInFavorites(brand, productId));

    if (!isHydrated) {
        return (
            <button
                type="button"
                className={styles.button}
                aria-pressed={false}
                disabled
                title="Loading..."
            >
                ☆
            </button>
        );
    }

    return (
        <button
            type="button"
            className={styles.button}
            aria-pressed={isIn}
            onClick={() => dispatch(toggleFavorite({ brand, id: productId }))}
            title={isIn ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isIn ? '★' : '☆'}
        </button>
    );
}
