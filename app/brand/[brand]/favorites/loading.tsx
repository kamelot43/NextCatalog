import styles from './FavoritesLoading.module.css';
import { ProductCardSkeleton } from '@/ui/skeletons/ProductCardSkeleton/ProductCardSkeleton';

export default function Loading() {
  return (
    <section className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Favorites</h1>
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
