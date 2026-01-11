'use client';

import styles from './CompareButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import { toggleCompare } from '@/features/comparison/model/comparisonSlice';

type Props = {
    brand: string;
    productId: string;
};

export function CompareButton({ productId, brand }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const ids = useSelector((s: RootState) => s.comparison.idsByBrand[brand] ?? []);
    const max = useSelector((s: RootState) => s.comparison.max);

    const isIn = ids.includes(productId);
    const isLimitReached = !isIn && ids.length >= max;

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
                // aria-pressed={isIn}
                disabled={isLimitReached}
                title={title}
                onClick={() => dispatch(toggleCompare({ brand, id: productId }))}
            >
                {isIn ? 'Compared' : 'Compare'}
            </button>

            {isLimitReached && <span className={styles.note}>Limit {max}</span>}
        </div>
    );
}
