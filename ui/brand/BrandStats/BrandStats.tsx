import styles from './BrandStats.module.css';

type Stats = {
  total: number;
  categoriesCount: number;
  yearMin: number | null;
  yearMax: number | null;
};

async function fetchStats(brand: string): Promise<Stats> {
  const mod = await import('@/server/stats/getBrandStats');
  const stats = mod.getBrandStatsServer(brand);

  if (!stats) {
    throw new Error('NOT_FOUND');
  }

  return stats;
}

export async function BrandStats({ brand }: { brand: string }) {
  const mod = await import('@/server/stats/getBrandStats');
  const data = mod.getBrandStatsServer(brand);
  if (!data) throw new Error('NOT_FOUND');

  const range = data.yearMin && data.yearMax ? `${data.yearMin}–${data.yearMax}` : '—';

  return (
    <section className={styles.stats}>
      <div className={styles.header}>Stats</div>

      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.value}>{data.total}</div>
          <div className={styles.label}>Cars</div>
        </div>

        <div className={styles.item}>
          <div className={styles.value}>{data.categoriesCount}</div>
          <div className={styles.label}>Categories</div>
        </div>

        <div className={styles.itemWide}>
          <div className={styles.value}>{range}</div>
          <div className={styles.label}>Production years</div>
        </div>
      </div>
    </section>
  );
}
