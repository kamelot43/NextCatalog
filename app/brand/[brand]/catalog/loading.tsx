import styles from './CatalogPage.module.css';
import { ProductCardSkeleton } from '@/ui/skeletons/ProductCardSkeleton/ProductCardSkeleton';
import { CatalogFiltersSkeleton } from '@/ui/skeletons/CatalogFiltersSkeleton/CatalogFiltersSkeleton';

export default function LoadingCatalog() {
  return (
    <section className={styles.page}>
      <aside className={styles.sidebar}>
        <CatalogFiltersSkeleton />
      </aside>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Catalog</h1>
          <p className={styles.results}>
            Results: <b>…</b>
          </p>
        </div>

        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        <div style={{ height: 44 }} />
      </div>
    </section>
  );
}
