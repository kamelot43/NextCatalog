'use client';

import { useState, useEffect } from 'react';
import styles from './CompareButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/shared/store/store';
import { toggleCompare } from '@/features/comparison/model/comparisonSlice';
import {
    selectIsProductInComparison,
    selectIsComparisonLimitReached,
    selectComparisonMaxLimit
} from '@/features/comparison/model/comparisonSelectors';

type Props = {
    brand: string;
    productId: string;
};

export function CompareButton({ productId, brand }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const max = useSelector(selectComparisonMaxLimit);
    const isIn = useSelector(selectIsProductInComparison(brand, productId));
    const isLimitReached = useSelector(selectIsComparisonLimitReached(brand));

    const title = isLimitReached
        ? `Limit reached (${max}). Remove one item to add another.`
        : isIn
            ? 'Remove from comparison'
            : 'Add to comparison';

    if (!isHydrated) {
        return (
            <button
                type="button"
                className={styles.button}
                aria-pressed={false}
                disabled
                title="Loading..."
            >
                Compare
            </button>
        );
    }

    return (
        <div className={styles.wrap}>
            <button
                type="button"
                className={styles.button}
                aria-pressed={isIn}
                disabled={!isIn && isLimitReached}
                title={title}
                onClick={() => dispatch(toggleCompare({ brand, id: productId }))}
            >
                {isIn ? 'Compared' : 'Compare'}
            </button>

            {isLimitReached && <span className={styles.note}>Limit {max}</span>}
        </div>
    );
}
