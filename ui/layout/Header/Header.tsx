'use client';

import Link from 'next/link';
import styles from './Header.module.css';

type Props = {
    brand: string;
};

export function Header({ brand }: Props) {
    const basePath = `/brand/${brand}`;

    return (
        <header className={styles.header}>
            <div className={styles.logo}>NextCatalog</div>

            <nav className={styles.nav}>
                <Link href={`${basePath}`}>Home</Link>
                <Link href={`${basePath}/catalog`}>Catalog</Link>
                <Link href={`${basePath}/favorites`}>Favorites</Link>
                <Link href={`${basePath}/comparison`}>Comparison</Link>
                <Link href={`${basePath}/account`}>Account</Link>
            </nav>

            <div className={styles.brandSwitch}>
                <Link href={`/brand/alpha`}>Alpha</Link>
                <Link href={`/brand/beta`}>Beta</Link>
            </div>
        </header>
    );
}
