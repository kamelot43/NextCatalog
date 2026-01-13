import styles from './CatalogFiltersSkeleton.module.css';

export function CatalogFiltersSkeleton() {
  return (
    <div className={styles.root} aria-busy="true" aria-label="Loading filters">
      <div className={styles.block}>
        <div className={styles.label} />
        <div className={styles.input} />
      </div>

      <div className={styles.block}>
        <div className={styles.label} />
        <div className={styles.select} />
      </div>

      <div className={styles.block}>
        <div className={styles.label} />
        <div className={styles.select} />
      </div>

      <div className={styles.block}>
        <div className={styles.label} />
        <div className={styles.select} />
      </div>

      <div className={styles.reset} />
    </div>
  );
}
