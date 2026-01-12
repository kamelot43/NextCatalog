import styles from './AccountPage.module.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isBrand } from '@/shared/config/brands';

import { getProfile, getPreferences } from '@/server/actions/account';
import { AccountClient } from '@/ui/account/AccountClient/AccountClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
    const { brand } = await params;
    return { title: `${brand} • Account` };
}

export default async function AccountPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    if (!isBrand(brand)) return notFound();

    const [profile, prefs] = await Promise.all([getProfile(), getPreferences()]);

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Account</h1>
                <p className={styles.subtitle}>Local profile & preferences (stored in cookies, no auth).</p>
            </div>

            <AccountClient brand={brand} initialProfile={profile} initialPrefs={prefs} />
        </section>
    );
}
