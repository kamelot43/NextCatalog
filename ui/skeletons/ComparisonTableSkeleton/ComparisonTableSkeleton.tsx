import styles from './ComparisonTableSkeleton.module.css';

function SkeletonBlock({ className }: { className?: string }) {
    return <div className={`${styles.skel} ${className ?? ''}`} />;
}

export function ComparisonTableSkeleton() {
    return (
        <div className={styles.wrap}>
            <div className={styles.toolbar}>
                <SkeletonBlock className={styles.skelText} />
                <SkeletonBlock className={styles.skelBtn} />
            </div>

            <div className={styles.table}>
                {/* header row */}
                <div className={styles.headerRow}>
                    <div className={styles.cellLeft}>
                        <SkeletonBlock className={styles.skelTextSm} />
                    </div>

                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className={styles.cell}>
                            <SkeletonBlock className={styles.skelTitle} />
                            <SkeletonBlock className={styles.skelBtnSm} />
                        </div>
                    ))}
                </div>

                {/* body rows */}
                {Array.from({ length: 6 }).map((_, rowIdx) => (
                    <div key={rowIdx} className={styles.row}>
                        <div className={styles.cellLeft}>
                            <SkeletonBlock className={styles.skelTextSm} />
                        </div>

                        {Array.from({ length: 3 }).map((__, colIdx) => (
                            <div key={colIdx} className={styles.cell}>
                                <SkeletonBlock className={styles.skelValue} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
