'use client';

import styles from './CompareButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import { toggleCompare } from '@/features/comparison/model/comparisonSlice';

type Props = {
    productId: string;
};

export function CompareButton({ productId }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const ids = useSelector((state: RootState) => state.comparison.ids);
    const max = useSelector((state: RootState) => state.comparison.max);

    const isIn = ids.includes(productId);
    const isLimitReached = !isIn && ids.length >= max;

    const title = isLimitReached
        ? `Limit reached (${max}). Remove one item to add another.`
        : isIn
            ? 'Remove from comparison'
            : 'Add to comparison';

    return (
        <button
            type="button"
            className={styles.button}
            aria-pressed={isIn}
            disabled={isLimitReached}
            title={title}
            onClick={() => dispatch(toggleCompare(productId))}
        >
            {isIn ? 'Compared' : 'Compare'}
        </button>
    );
}
