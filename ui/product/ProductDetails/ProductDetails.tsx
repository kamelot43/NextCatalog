import Link from 'next/link';
import styles from './ProductDetails.module.css';
import type { Product } from '@/shared/mock/products';
import { FavoriteButton } from '@/ui/favorites/FavoriteButton/FavoriteButton';

type Props = {
    brand: string;
    product: Product;
};

export function ProductDetails({ brand, product }: Props) {
    return (
        <section className={styles.page}>
            <div className={styles.top}>
                <div>
                    <h1 className={styles.title}>{product.title}</h1>
                    <div className={styles.meta}>
                        <span>{product.year}</span>
                        <span className={styles.dot}>•</span>
                        <span>{product.category.toUpperCase()}</span>
                    </div>
                </div>

                <FavoriteButton productId={product.id} />
            </div>

            <div className={styles.price}>
                {product.price.toLocaleString('ru-RU')} {product.currency}
            </div>

            <div className={styles.specs}>
                <div className={styles.specItem}>
                    <div className={styles.specLabel}>Power</div>
                    <div>{product.specs.powerHp} hp</div>
                </div>

                <div className={styles.specItem}>
                    <div className={styles.specLabel}>Transmission</div>
                    <div>{product.specs.transmission}</div>
                </div>

                <div className={styles.specItem}>
                    <div className={styles.specLabel}>Drive</div>
                    <div>{product.specs.drive}</div>
                </div>
            </div>

            <Link className={styles.back} href={`/brand/${brand}/catalog`}>
                ← Back to catalog
            </Link>
        </section>
    );
}
