import Link from 'next/link';
import styles from './ProductCard.module.css';
import type { Product } from '@/shared/mock/products';
import { FavoriteButton } from '@/ui/favorites/FavoriteButton/FavoriteButton';
import { CompareButton } from '@/ui/comparison/CompareButton/CompareButton';

type Props = {
    brand: string;
    product: Product;
};

export function ProductCard({ brand, product }: Props) {
    const href = `/brand/${brand}/product/${product.slug}`;

    return (
        <article className={styles.card}>
            <div className={styles.head}>
                <h3 className={styles.title}>
                    <Link href={href}>{product.title}</Link>
                </h3>
                <div className={styles.actions}>
                    {/*<CompareButton brand={brand} productId={product.id} />*/}
                    {/*<FavoriteButton brand={brand} productId={product.id} />*/}
                </div>
            </div>

            <div className={styles.meta}>
                <span>{product.year}</span>
                <span className={styles.dot}>•</span>
                <span>{product.category.toUpperCase()}</span>
            </div>

            <div className={styles.price}>
                {product.price.toLocaleString('ru-RU')} {product.currency}
            </div>

            <div className={styles.specs}>
                <span>{product.specs.powerHp} hp</span>
                <span className={styles.dot}>•</span>
                <span>{product.specs.transmission}</span>
                <span className={styles.dot}>•</span>
                <span>{product.specs.drive}</span>
            </div>
        </article>
    );
}
