'use client';

import styles from './AccountClient.module.css';
import { useState } from 'react';
import type { Profile, Preferences } from '@/server/actions/account';
import { useProfile } from '@/shared/context/ProfileContext';

import { AccountProfileForm } from '@/ui/account/AccountProfileForm/AccountProfileForm';
import { AccountPreferencesForm } from '@/ui/account/AccountPreferencesForm/AccountPreferencesForm';
import { AccountDangerZone } from '@/ui/account/AccountDangerZone/AccountDangerZone';
import { getAvatarSrc } from '@/shared/config/avatars';
import { Avatar } from '@/ui/avatar/Avatar/Avatar';

function fmtPrefs(p: Preferences) {
    const limit = p.catalog?.limit ?? 6;
    const sort = p.catalog?.sort ?? 'year_desc';
    const locale = p.locale ?? 'ru-RU';
    const currency = p.currency ?? 'RUB';

    return `${locale} • ${currency} • catalog: ${limit}/page, ${sort}`;
}

export function AccountClient({
  brand,
  initialProfile,
  initialPrefs,
}: {
    brand: string;
    initialProfile: Profile;
    initialPrefs: Preferences;
}) {
    const [profile, setProfile] = useState(initialProfile);
    const [prefs, setPrefs] = useState(initialPrefs);
    const { setProfile: setProfileCtx } = useProfile();

    return (
        <div className={styles.grid}>
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Current settings</h2>
                <div className={styles.current}>
                    <div className={styles.currentRow}>
                      <span className={styles.label}>Avatar:</span>
                      <Avatar src={getAvatarSrc(profile.avatarId)} alt="Avatar" size={36} />
                    </div>
                    <div><span className={styles.label}>Name:</span> {profile.displayName || '—'}</div>
                    <div><span className={styles.label}>Email:</span> {profile.email || '—'}</div>
                    <div><span className={styles.label}>Prefs:</span> {fmtPrefs(prefs)}</div>
                </div>
            </div>

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Change settings</h2>

                <div className={styles.forms}>
                    <AccountProfileForm
                        key={`profile-${profile.updatedAt}`}
                        brand={brand}
                        initialProfile={profile}
                        onSaved={(p) => {
                            setProfile(p);
                            setProfileCtx(p);
                        }}
                    />

                    <AccountPreferencesForm
                        key={`prefs-${prefs.locale}-${prefs.currency}-${prefs.catalog.limit}-${prefs.catalog.sort}`}
                        brand={brand}
                        initialPrefs={prefs}
                        onSaved={setPrefs}
                    />
                </div>
            </div>

            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Data</h2>
                <AccountDangerZone
                    brand={brand}
                    onReset={(nextProfile, nextPrefs) => {
                        setProfile(nextProfile);
                        setPrefs(nextPrefs);
                        setProfileCtx(nextProfile);
                    }}
                />
            </div>
        </div>
    );
}
