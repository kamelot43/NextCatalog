import styles from './ProductDetailsSkeleton.module.css';

export function ProductDetailsSkeleton() {
    return (
        <section className={styles.page} aria-busy="true" aria-label="Loading product details">
            <div className={styles.hero} />

            <div className={styles.top}>
                <div>
                    <div className={styles.title} />
                    <div className={styles.meta} />
                </div>

                <div className={styles.actions}>
                    <div className={styles.circleBtn} />
                    <div className={styles.circleBtn} />
                </div>
            </div>

            <div className={styles.price} />

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

            <div className={styles.back} />
        </section>
    );
}
