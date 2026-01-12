import {notFound} from 'next/navigation';
import {Providers} from '@/shared/store/provider';
import {Header} from '@/ui/layout/Header/Header';
import {Footer} from "@/ui/layout/Footer/Footer";
import {isBrand} from '@/shared/config/brands';
import type {Metadata} from 'next';
import { getFavoritesMap, getCompareMap } from '@/server/actions/preferences';
import { getProfile } from '@/server/actions/account';
import { getPreferences } from "@/server/actions/account";
import { PreferencesProvider } from '@/shared/context/PreferencesContext';
import { ProfileGate } from '@/ui/layout/ProfileGate/ProfileGate';
import styles from './layout.module.css';

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string }>;
}): Promise<Metadata> {
    const {brand} = await params;

    if (!isBrand(brand)) return notFound();

    const brandTitle = brand === 'alpha' ? 'Alpha' : brand === 'beta' ? 'Beta' : brand;

    return {
        title: `${brandTitle} — NextCatalog`,
        description: `Каталог автомобилей бренда ${brandTitle}. Сравнение, избранное, фильтры.`,
    };
}

export default async function BrandLayout({
  children,
  params,
}: {
    children: React.ReactNode;
    params: Promise<{ brand: string }>;
}) {

    const { brand } = await params;
    if (!isBrand(brand)) return notFound();

    const [favoritesMap, compareMap, prefs, profile] = await Promise.all([
        getFavoritesMap(),
        getCompareMap(),
        getPreferences(),
        getProfile(),
    ]);

    const preloadedState = {
        favorites: { idsByBrand: favoritesMap },
        comparison: { idsByBrand: compareMap, max: 4 },
    };

    return (
        <div data-brand={brand} className={styles.page}>
            <ProfileGate initialProfile={profile}>
                <PreferencesProvider value={prefs}>
                    <Providers preloadedState={preloadedState as any}>
                        <Header brand={brand}/>
                        <main className={styles.main}>{children}</main>
                        <Footer />
                    </Providers>
                </PreferencesProvider>
            </ProfileGate>
        </div>
    );
}
