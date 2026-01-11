'use client';

import styles from './FavoriteButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import { toggleFavorite } from '@/features/favorites/model/favoritesSlice';

type Props = {
    brand: string;
    productId: string;
};

export function FavoriteButton({ brand, productId }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const ids = useSelector((s: RootState) => s.favorites.idsByBrand[brand] ?? []);
    const isIn = ids.includes(productId);

    return (
        <button
            type="button"
            className={styles.button}
            // aria-pressed={isIn}
            onClick={() => dispatch(toggleFavorite({ brand, id: productId }))}
            title={isIn ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isIn ? '★' : '☆'}
        </button>
    );
}
