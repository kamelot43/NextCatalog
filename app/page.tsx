import Link from 'next/link';
import styles from './HomePage.module.css';

const BRANDS = [
  { id: 'alpha', title: 'Alpha', desc: 'Modern lineup: city & sport models.' },
  { id: 'beta', title: 'Beta', desc: 'Balanced lineup: family & comfort cars.' },
] as const;

export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.h1}>NextCatalog</h1>
        <p className={styles.subtitle}>
          Browse cars by brand, save favorites, compare models and tune your preferences.
        </p>

        <div className={styles.ctaRow}>
          <Link className={styles.primaryBtn} href="/brand/alpha">
            Start with Alpha →
          </Link>
        </div>
      </section>

      <section id="brands" className={styles.section}>
        <h2 className={styles.h2}>Choose a brand</h2>

        <div className={styles.grid}>
          {BRANDS.map((b) => (
            <Link key={b.id} href={`/brand/${b.id}`} className={styles.brandCard}>
              <div className={styles.brandTop}>
                <div className={styles.brandBadge}>{b.title}</div>
              </div>
              <p className={styles.brandDesc}>{b.desc}</p>
              <div className={styles.brandLink}>Open brand →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>What you can do</h2>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Favorites</div>
            <div className={styles.featureText}>Save cars you like and return later.</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Comparison</div>
            <div className={styles.featureText}>Compare up to 4 cars side-by-side.</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Preferences</div>
            <div className={styles.featureText}>Currency and catalog defaults via cookies.</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>App Router</div>
            <div className={styles.featureText}>
              SSR + Server Actions + clean server/client split.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
