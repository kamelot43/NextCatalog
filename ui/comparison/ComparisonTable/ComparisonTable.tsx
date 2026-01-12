'use client';

import Link from 'next/link';
import styles from './ComparisonTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition } from 'react';

import type { RootState, AppDispatch } from '@/shared/store/store';
import type { Product } from '@/shared/mock/products';

import { hydrateCompare } from '@/features/comparison/model/comparisonSlice';
import { toggleCompareCookie, clearCompareCookie } from '@/server/actions/preferences';

type Props = {
    brand: string;
    products: Product[];
};

export function ComparisonTable({ brand, products }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const max = useSelector((s: RootState) => s.comparison.max);

    const [pending, startTransition] = useTransition();

    const items = products;

    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>Nothing to compare</h2>
                <p className={styles.emptyText}>Add up to {max} products from the catalog.</p>
                <Link className={styles.link} href={`/brand/${brand}/catalog`}>
                    Go to catalog →
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.toolbar}>
                <div className={styles.count}>
                    Selected: <strong>{items.length}</strong> / {max}
                </div>

                <button
                    className={styles.clear}
                    disabled={pending}
                    onClick={() => {
                        startTransition(async () => {
                            const res = await clearCompareCookie(brand);
                            dispatch(hydrateCompare(res.map));
                        });
                    }}
                >
                    Clear all
                </button>
            </div>

            <div className={styles.table}>
                <div className={styles.headerRow}>
                    <div className={styles.cellLeft}>Field</div>

                    {items.map((p) => (
                        <div key={p.id} className={styles.cell}>
                            <div className={styles.prodTitle}>
                                <Link href={`/brand/${brand}/product/${p.slug}`}>{p.title}</Link>
                            </div>

                            <button
                                className={styles.remove}
                                disabled={pending}
                                onClick={() => {
                                    startTransition(async () => {
                                        const res = await toggleCompareCookie(brand, p.id);
                                        dispatch(hydrateCompare(res.map));
                                    });
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <HighlightRow
                    label="Price"
                    values={items.map((p) => ({
                        value: p.price,
                        text: formatPrice(p.price, p.currency),
                    }))}
                    highlightIndex={getMinIndex(items.map((p) => p.price))}
                    highlightTitle="Best price"
                />
                <Row label="Year" values={items.map((p) => String(p.year))} />
                <Row label="Category" values={items.map((p) => p.category.toUpperCase())} />
                <HighlightRow
                    label="Power"
                    values={items.map((p) => ({
                        value: p.specs.powerHp,
                        text: `${p.specs.powerHp} hp`,
                    }))}
                    highlightIndex={getMaxIndex(items.map((p) => p.specs.powerHp))}
                    highlightTitle="Max power"
                />
                <Row label="Transmission" values={items.map((p) => p.specs.transmission)} />
                <Row label="Drive" values={items.map((p) => p.specs.drive)} />
            </div>
        </div>
    );
}

function Row({ label, values }: { label: string; values: string[] }) {
    return (
        <div className={styles.row}>
            <div className={styles.cellLeft}>{label}</div>
            {values.map((v, idx) => (
                <div key={idx} className={styles.cell}>
                    {v}
                </div>
            ))}
        </div>
    );
}

function HighlightRow({
  label,
  values,
  highlightIndex,
  highlightTitle,
}: {
    label: string;
    values: { value: number; text: string }[];
    highlightIndex: number;
    highlightTitle: string;
}) {
    return (
        <div className={styles.row}>
            <div className={styles.cellLeft}>{label}</div>
            {values.map((v, idx) => (
                <div
                    key={idx}
                    className={`${styles.cell} ${idx === highlightIndex ? styles.best : ''}`}
                    title={idx === highlightIndex ? highlightTitle : undefined}
                >
                    {v.text}
                </div>
            ))}
        </div>
    );
}

function formatPrice(price: number, currency: string) {
    return `${price.toLocaleString('ru-RU')} ${currency}`;
}

function getMinIndex(nums: number[]) {
    if (nums.length === 0) return -1;
    let min = nums[0];
    let idx = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i];
            idx = i;
        }
    }
    return idx;
}

function getMaxIndex(nums: number[]) {
    if (nums.length === 0) return -1;
    let max = nums[0];
    let idx = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i];
            idx = i;
        }
    }
    return idx;
}
