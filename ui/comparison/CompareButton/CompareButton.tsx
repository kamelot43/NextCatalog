'use client';

import { useTransition } from 'react';
import styles from './CompareButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/shared/store/store';
import { toggleCompare, hydrateCompare } from '@/features/comparison/model/comparisonSlice';
import { toggleCompareCookie } from '@/server/actions/preferences';
import {
  selectIsProductInComparison,
  selectIsComparisonLimitReached,
  selectComparisonMaxLimit,
} from '@/features/comparison/model/comparisonSelectors';

type Props = {
  brand: string;
  productId: string;
};

export function CompareButton({ productId, brand }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [pending, startTransition] = useTransition();

  const max = useSelector(selectComparisonMaxLimit);
  const isIn = useSelector(selectIsProductInComparison(brand, productId));
  const isLimitReached = useSelector(selectIsComparisonLimitReached(brand));

  const title = isLimitReached
    ? `Limit reached (${max}). Remove one item to add another.`
    : isIn
      ? 'Remove from comparison'
      : 'Add to comparison';

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        aria-pressed={isIn}
        disabled={pending || (!isIn && isLimitReached)}
        title={title}
        onClick={() => {
          dispatch(toggleCompare({ brand, id: productId }));

          startTransition(async () => {
            const res = await toggleCompareCookie(brand, productId);

            // @ts-ignore
            if (!res.ok && res.reason === 'LIMIT') {
              dispatch(toggleCompare({ brand, id: productId }));
              return;
            }

            if (res.ok) dispatch(hydrateCompare(res.map));
          });
        }}
      >
        {isIn ? 'Compared' : 'Compare'}
      </button>

      {isLimitReached && <span className={styles.note}>Limit {max}</span>}
    </div>
  );
}
