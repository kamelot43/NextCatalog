import Link from 'next/link';
import styles from './ProductDetails.module.css';
import type { Brand, Product } from '@/shared/mock/products';
import { FavoriteButton } from '@/ui/favorites/FavoriteButton/FavoriteButton';
import { CompareButton } from '@/ui/comparison/CompareButton/CompareButton';
import { getProductImageSrc } from '@/shared/lib/products/getProductImageSrc';
import { ProductImage } from '@/ui/product/ProductImage/ProductImage';
import { PriceText } from '@/ui/product/PriceText/PriceText';

type Props = {
    brand: Brand;
    product: Product;
};

export function ProductDetails({ brand, product }: Props) {
    const imageSrc = getProductImageSrc({
        brand,
        category: product.category,
        image: product.image,
    });

    return (
        <section className={styles.page}>
            <Link className={styles.backTop} href={`/brand/${brand}/catalog`}>
                ← Back to catalog
            </Link>

            <div className={styles.hero}>
                <ProductImage
                    src={imageSrc}
                    alt={product.title}
                    className={styles.heroImg}
                    priority
                />
                <div className={styles.heroFade} />
            </div>

            <div className={styles.card}>
                <div className={styles.top}>
                    <div className={styles.head}>
                        <h1 className={styles.title}>{product.title}</h1>

                        <div className={styles.meta}>
                            <span className={styles.pill}>{product.year}</span>
                            <span className={styles.pill}>{product.category.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <CompareButton brand={brand} productId={product.id} />
                        <FavoriteButton brand={brand} productId={product.id} />
                    </div>
                </div>

                <div className={styles.priceRow}>
                    <div className={styles.price}>
                        <PriceText priceRub={product.price} />
                    </div>
                    <div className={styles.subPrice}>Price is shown in selected currency</div>
                </div>

                <div className={styles.specs}>
                    <div className={styles.specItem}>
                        <div className={styles.specLabel}>Power</div>
                        <div className={styles.specValue}>{product.specs.powerHp} hp</div>
                    </div>

                    <div className={styles.specItem}>
                        <div className={styles.specLabel}>Transmission</div>
                        <div className={styles.specValue}>{product.specs.transmission}</div>
                    </div>

                    <div className={styles.specItem}>
                        <div className={styles.specLabel}>Drive</div>
                        <div className={styles.specValue}>{product.specs.drive}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
