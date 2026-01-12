import styles from './BrandStatsSkeleton.module.css';

export function BrandStatsSkeleton() {
    return (
        <div className={styles.row} aria-label="Loading stats">
            <span className={styles.skeleton} />
            <span className={styles.dot}>•</span>
            <span className={styles.skeleton} />
            <span className={styles.dot}>•</span>
            <span className={styles.skeleton} />
        </div>
    );
}
