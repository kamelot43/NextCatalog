import styles from './ProductCardSkeleton.module.css';

export function ProductCardSkeleton() {
    return (
        <div className={styles.card} aria-busy="true" aria-label="Loading product">
            <div className={styles.image} />
            <div className={styles.body}>
                <div className={styles.title} />
                <div className={styles.meta} />
                <div className={styles.metaShort} />

                <div className={styles.footer}>
                    <div className={styles.price} />
                    <div className={styles.actions}>
                        <div className={styles.circleBtn} />
                        <div className={styles.circleBtn} />
                    </div>
                </div>
            </div>
        </div>
    );
}
