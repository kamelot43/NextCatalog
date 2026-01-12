'use client';

import {useState, useTransition} from 'react';
import Image from 'next/image';
import styles from './AccountProfileForm.module.css';
import type {Profile} from '@/server/actions/account';
import {updateProfileAction} from '@/server/actions/account';

import {AVATARS} from '@/shared/config/avatars';
import type {AvatarId} from '@/shared/config/avatars';

export function AccountProfileForm({
   brand,
   initialProfile,
   onSaved,
}: {
    brand: string;
    initialProfile: Profile;
    onSaved: (p: Profile) => void;
}) {
    const [pending, startTransition] = useTransition();
    const [saved, setSaved] = useState(false);
    const [avatarId, setAvatarId] = useState<AvatarId>((initialProfile.avatarId ?? 'a1') as AvatarId);

    return (
        <form
            className={styles.form}
            action={(formData) => {
                setSaved(false);
                startTransition(async () => {
                    const res = await updateProfileAction(brand, formData);
                    if (res.ok) {
                        setSaved(true);
                        onSaved(res.profile);
                    }
                });
            }}
        >
            <label className={styles.field}>
                <span className={styles.label}>Display name</span>
                <input
                    className={styles.input}
                    name="displayName"
                    defaultValue={initialProfile.displayName}
                    placeholder="Your name"
                    maxLength={40}
                />
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Email (optional)</span>
                <input
                    className={styles.input}
                    name="email"
                    defaultValue={initialProfile.email ?? ''}
                    placeholder="name@example.com"
                    maxLength={80}
                />
            </label>

            <div className={styles.field}>
                <span className={styles.label}>Avatar</span>
                <input type="hidden" name="avatarId" value={avatarId}/>
                <div className={styles.avatars}>
                    {AVATARS.map((a) => (
                        <button
                            key={a.id}
                            type="button"
                            className={`${styles.avatarBtn} ${avatarId === a.id ? styles.avatarActive : ''}`}
                            aria-label={`Select ${a.label}`}
                            onClick={() => setAvatarId(a.id)}
                        >
                            <Image
                                src={a.src}
                                alt={a.label}
                                width={64}
                                height={64}
                                className={styles.avatarImg}
                            />
                        </button>
                    ))}
                </div>
            </div>


            <div className={styles.row}>
                <button className={styles.button} type="submit" disabled={pending}>
                    Save
                </button>
                {saved && <span className={styles.saved}>Saved</span>}
            </div>

            <p className={styles.hint}>
                Data is stored locally in cookies (no authentication).
            </p>
        </form>
    );
}
