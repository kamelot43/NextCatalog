'use client';

import { useTransition } from 'react';
import styles from './FavoriteButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/shared/store/store';

import { toggleFavorite, hydrateFavorites } from '@/features/favorites/model/favoritesSlice';
import { selectIsProductInFavorites } from '@/features/favorites/model/favoritesSelectors';

import { toggleFavoriteCookie } from '@/server/actions/preferences';

type Props = {
  brand: string;
  productId: string;
};

export function FavoriteButton({ brand, productId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const isIn = useSelector(selectIsProductInFavorites(brand, productId));
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={isIn}
      disabled={pending}
      onClick={() => {
        if (pending) return;

        const previousState = isIn;
        dispatch(toggleFavorite({ brand, id: productId }));

        startTransition(async () => {
          try {
            const res = await toggleFavoriteCookie(brand, productId);
            if (!res.ok) throw new Error('Server error');
            if (res.ok) dispatch(hydrateFavorites(res.map));
          } catch {
            if (previousState !== isIn) {
              dispatch(toggleFavorite({ brand, id: productId }));
            }
          }
        });
      }}
      title={isIn ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isIn ? '★' : '☆'}
    </button>
  );
}
