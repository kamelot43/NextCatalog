import styles from './ComparisonLoading.module.css';
import { ComparisonTableSkeleton } from '@/ui/skeletons/ComparisonTableSkeleton/ComparisonTableSkeleton';

export default function Loading() {
  return (
    <section className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Comparison</h1>
      </div>

      <ComparisonTableSkeleton />
    </section>
  );
}
