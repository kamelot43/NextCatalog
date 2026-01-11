import styles from './FavoritesPage.module.css';
import {getProducts} from '@/shared/api/products';
import {FavoritesList} from '@/ui/favorites/FavoritesList/FavoritesList';
import type {Metadata} from 'next';


function toBrandTitle(brand: string) {
    return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string }>;
}): Promise<Metadata> {

    const {brand} = await params;
    const brandTitle = toBrandTitle(brand);

    return {
        title: `${brandTitle} • Favorites`,
        description: `Your saved ${brandTitle} cars. Quickly return to models you liked.`,
    };
}

export default async function FavoritesPage({
    params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const {brand} = await params;

    const products = await getProducts(brand);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Favorites</h1>
            <FavoritesList brand={brand} products={products}/>
        </section>
    );
}
