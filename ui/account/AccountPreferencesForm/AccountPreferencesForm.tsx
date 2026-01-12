'use client';

import { useState, useTransition } from 'react';
import styles from './AccountPreferencesForm.module.css';
import {updatePreferencesAction} from "@/server/actions/account";
import type { Preferences } from '@/server/actions/account';

export function AccountPreferencesForm({
   brand,
   initialPrefs,
   onSaved,
}: {
    brand: string;
    initialPrefs: Preferences;
    onSaved: (p: Preferences) => void;
}) {
    const [pending, startTransition] = useTransition();
    const [saved, setSaved] = useState(false);

    return (
        <form
            className={styles.form}
            action={(formData) => {
                setSaved(false);
                startTransition(async () => {
                    const res = await updatePreferencesAction(brand, formData);
                    if (res.ok) {
                        setSaved(true);
                        onSaved(res.prefs);
                    }
                });
            }}
        >
            <div className={styles.row2}>
                <label className={styles.field}>
                    <span className={styles.label}>Locale</span>
                    <select className={styles.select} name="locale" defaultValue={initialPrefs.locale}>
                        <option value="ru-RU">ru-RU</option>
                        <option value="en-US">en-US</option>
                    </select>
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Currency</span>
                    <select className={styles.select} name="currency" defaultValue={initialPrefs.currency}>
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </label>
            </div>

            <div className={styles.row2}>
                <label className={styles.field}>
                    <span className={styles.label}>Catalog: items per page</span>
                    <select
                        className={styles.select}
                        name="catalogLimit"
                        defaultValue={String(initialPrefs.catalog.limit)}
                    >
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                    </select>
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Catalog: default sort</span>
                    <select className={styles.select} name="catalogSort" defaultValue={initialPrefs.catalog.sort}>
                        <option value="year_desc">Year (new → old)</option>
                        <option value="price_asc">Price (low → high)</option>
                        <option value="price_desc">Price (high → low)</option>
                    </select>
                </label>
            </div>

            <div className={styles.row}>
                <button className={styles.button} type="submit" disabled={pending}>
                    Save
                </button>
                {saved && <span className={styles.saved}>Saved</span>}
            </div>

            <p className={styles.hint}>
                URL query params still win on the catalog page; these are defaults.
            </p>
        </form>
    );
}
