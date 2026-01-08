'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BrandNav.module.css';

type NavItem = { label: string; href: string; match: (p: string) => boolean };

export function BrandNav({ brand }: { brand: string }) {
    const pathname = usePathname() || '';

    const base = `/brand/${brand}`;

    const items: NavItem[] = [
        {
            label: 'Home',
            href: `${base}`,
            match: (p) => p === base,
        },
        {
            label: 'Catalog',
            href: `${base}/catalog`,
            match: (p) => p.startsWith(`${base}/catalog`) || p.startsWith(`${base}/product/`),
            // product считаем частью каталога
        },
        {
            label: 'Favorites',
            href: `${base}/favorites`,
            match: (p) => p.startsWith(`${base}/favorites`),
        },
        {
            label: 'Comparison',
            href: `${base}/comparison`,
            match: (p) => p.startsWith(`${base}/comparison`),
        },
        {
            label: 'Account',
            href: `${base}/account`,
            match: (p) => p.startsWith(`${base}/account`),
        },
    ];

    return (
        <nav className={styles.nav} aria-label="Sections">
            {items.map((it) => {
                const isActive = it.match(pathname);
                return (
                    <Link
                        key={it.label}
                        href={it.href}
                        className={`${styles.link} ${isActive ? styles.active : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </nav>
    );
}
