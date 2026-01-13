import styles from './ProductDetailsSkeleton.module.css';

export function ProductDetailsSkeleton() {
  return (
    <section className={styles.page} aria-busy="true" aria-label="Loading product details">
      <div className={styles.backTop} />

      <div className={styles.hero} />

      <div className={styles.card}>
        <div className={styles.top}>
          <div>
            <div className={styles.title} />
            <div className={styles.pills}>
              <div className={styles.pill} />
              <div className={styles.pill} />
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.circleBtn} />
            <div className={styles.circleBtn} />
          </div>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.price} />
          <div className={styles.subPrice} />
        </div>

        <div className={styles.specs}>
          <div className={styles.specItem}>
            <div className={styles.specLabel} />
            <div className={styles.specValue} />
          </div>
          <div className={styles.specItem}>
            <div className={styles.specLabel} />
            <div className={styles.specValue} />
          </div>
          <div className={styles.specItem}>
            <div className={styles.specLabel} />
            <div className={styles.specValue} />
          </div>
        </div>
      </div>
    </section>
  );
}
