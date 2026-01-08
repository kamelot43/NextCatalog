'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BrandSwitch.module.css';

type Props = {
    currentBrand?: string | null;
    brands: string[]; // ['alpha', 'beta']
};

export function BrandSwitch({ currentBrand, brands }: Props) {
    const pathname = usePathname();

    function getHref(nextBrand: string) {
        if (!pathname) {
            return `/brand/${nextBrand}`;
        }

        const brandRouteMatch = pathname.match(/^\/brand\/([^/]+)(\/.*)?$/);

        if (brandRouteMatch) {
            const currentBrand = brandRouteMatch[1];
            const restPath = brandRouteMatch[2] ?? '';

            // если на детальной странице товара — отправляем в каталог нового бренда
            if (restPath.startsWith('/product/')) {
                return `/brand/${nextBrand}/catalog`;
            }

            return `/brand/${nextBrand}${restPath}`;
        }

        return `/brand/${nextBrand}`;
    }

    return (
        <nav className={styles.wrap} aria-label="Brand switch">
            {brands.map((b) => {
                const isActive = currentBrand === b;
                return (
                    <Link
                        key={b}
                        href={getHref(b)}
                        className={`${styles.link} ${isActive ? styles.active : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {b[0].toUpperCase() + b.slice(1)}
                    </Link>
                );
            })}
        </nav>
    );
}
