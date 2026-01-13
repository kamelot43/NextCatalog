'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { BrandSwitch } from '@/ui/layout/BrandSwitch/BrandSwitch';
import { BrandNav } from '@/ui/layout/BrandNav/BrandNav';

import { useProfile } from '@/shared/context/ProfileContext';
import { getAvatarSrc } from '@/shared/config/avatars';
import { Avatar } from '@/ui/avatar/Avatar/Avatar';

type Props = {
  brand: string;
};

export function Header({ brand }: Props) {
  const basePath = `/brand/${brand}`;
  const { profile } = useProfile();

  return (
    <header className={styles.header}>
      <Link href={basePath} className={styles.logo}>
        NextCatalog
      </Link>

      <BrandNav brand={brand} />

      <div className={styles.right}>
        <Link href={`${basePath}/account`} className={styles.userLink} aria-label="Go to account">
          <div className={styles.user}>
            <Avatar src={getAvatarSrc(profile.avatarId)} alt="Avatar" size={32} />
            <span className={styles.userName}>{profile.displayName || 'Guest'}</span>
          </div>
        </Link>

        <div className={styles.brandSwitch}>
          <BrandSwitch currentBrand={brand} brands={['alpha', 'beta']} />
        </div>
      </div>
    </header>
  );
}
