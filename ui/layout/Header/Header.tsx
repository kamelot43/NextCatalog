'use client';

import styles from './Header.module.css';
import {BrandSwitch} from "@/ui/layout/BrandSwitch/BrandSwitch";
import {BrandNav} from "@/ui/layout/BrandNav/BrandNav";


type Props = {
    brand: string;
};

export function Header({ brand }: Props) {
    const basePath = `/brand/${brand}`;

    return (
        <header className={styles.header}>
            <div className={styles.logo}>NextCatalog</div>

            <BrandNav brand={brand} />

            <div className={styles.brandSwitch}>
                <BrandSwitch currentBrand={brand} brands={['alpha', 'beta']} />
            </div>
        </header>
    );
}
