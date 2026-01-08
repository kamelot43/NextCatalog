'use client';

import Link from 'next/link';
import styles from './ComparisonTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/shared/store/store';
import type { Product } from '@/shared/mock/products';
import { removeCompare, clearCompare } from '@/features/comparison/model/comparisonSlice';

type Props = {
    brand: string;
    products: Product[];
};

export function ComparisonTable({ brand, products }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const ids = useSelector((s: RootState) => s.comparison.idsByBrand[brand] ?? []);
    const max = useSelector((s: RootState) => s.comparison.max);

    const items = ids
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[];

    if (ids.length === 0) {
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

    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>No matching products</h2>
                <p className={styles.emptyText}>
                    Selected items are not available for this brand.
                </p>
                <div className={styles.row}>
                    <button className={styles.clear} onClick={() => dispatch(clearCompare())}>
                        Clear comparison
                    </button>
                    <Link className={styles.link} href={`/brand/${brand}/catalog`}>
                        Go to catalog →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.toolbar}>
                <div className={styles.count}>
                    Selected: <strong>{items.length}</strong> / {max}
                </div>

                <button className={styles.clear} onClick={() => dispatch(clearCompare({ brand }))}>
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
                                onClick={() => dispatch(removeCompare({ brand, id: p.id }))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <HighlightRow
                    label="Price"
                    values={items.map((p) => ({ value: p.price, text: formatPrice(p.price, p.currency) }))}
                    highlightIndex={getMinIndex(items.map((p) => p.price))}
                    highlightTitle="Best price"
                />
                <Row label="Year" values={items.map((p) => String(p.year))} />
                <Row label="Category" values={items.map((p) => p.category.toUpperCase())} />
                <HighlightRow
                    label="Power"
                    values={items.map((p) => ({ value: p.specs.powerHp, text: `${p.specs.powerHp} hp` }))}
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
