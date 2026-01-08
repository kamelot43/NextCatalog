import styles from './FavoritesPage.module.css';
import { getProducts } from '@/shared/api/products';
import { FavoritesList } from '@/ui/favorites/FavoritesList/FavoritesList';

export default async function FavoritesPage({
    params,
}: {
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;

    const products = await getProducts(brand);

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Favorites</h1>
            <FavoritesList brand={brand} products={products} />
        </section>
    );
}
