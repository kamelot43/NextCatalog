'use client';

import { useState, useTransition } from 'react';
import styles from './AccountDangerZone.module.css';

import { hydrateFavorites } from '@/features/favorites/model/favoritesSlice';
import { hydrateCompare } from '@/features/comparison/model/comparisonSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/shared/store/store';
import { Profile } from '@/server/actions/account';
import { Preferences } from '@/server/actions/account';

import { clearFavoritesCookie, clearCompareCookie } from '@/server/actions/preferences';
import { resetAccountAction } from '@/server/actions/account';

export function AccountDangerZone({
  brand,
  onReset,
}: {
  brand: string;
  onReset: (profile: Profile, prefs: Preferences) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <button
        className={styles.button}
        disabled={pending}
        onClick={() => {
          setDone(null);
          startTransition(async () => {
            const res = await clearFavoritesCookie(brand);
            dispatch(hydrateFavorites(res.map));
            setDone('Favorites cleared');
          });
        }}
      >
        Clear favorites
      </button>

      <button
        className={styles.button}
        disabled={pending}
        onClick={() => {
          setDone(null);
          startTransition(async () => {
            const res = await clearCompareCookie(brand);
            dispatch(hydrateCompare(res.map));
            setDone('Comparison cleared');
          });
        }}
      >
        Clear comparison
      </button>

      <button
        className={styles.buttonDanger}
        disabled={pending}
        onClick={() => {
          setDone(null);
          startTransition(async () => {
            const res = await resetAccountAction(brand);
            if (res.ok) {
              setDone('Account reset');
              onReset(res.profile, res.prefs);
            }
          });
        }}
      >
        Reset profile & preferences
      </button>

      {done && <div className={styles.done}>{done}</div>}
      <p className={styles.hint}>These actions update cookies on the server.</p>
    </div>
  );
}
