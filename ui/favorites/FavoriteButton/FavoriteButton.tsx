'use client';

import styles from './FavoriteButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import { toggleFavorite } from '@/features/favorites/model/favoritesSlice';

type Props = {
    productId: string;
};

export function FavoriteButton({ productId }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const isFav = useSelector((s: RootState) => s.favorites.ids.includes(productId));

    return (
        <button
            type="button"
            className={styles.button}
            aria-pressed={isFav}
            onClick={() => dispatch(toggleFavorite(productId))}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFav ? '★' : '☆'}
        </button>
    );
}
