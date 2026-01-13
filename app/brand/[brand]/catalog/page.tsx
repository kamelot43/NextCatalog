import styles from './CatalogPage.module.css';
import { parseCatalogQuery } from '@/shared/lib/catalog/catalogQuery';
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';
import CatalogFilters from '@/ui/catalog-filters/CatalogFilters';
import { Pagination } from '@/ui/pagination/Pagination';
import { getPreferences } from '@/server/actions/account';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { isBrand } from '@/shared/config/brands';
import { getProductsServer } from '@/server/catalog/getProducts';

function toBrandTitle(brand: string) {
  return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const brandTitle = toBrandTitle(brand);

  return {
    title: `${brandTitle} • Catalog`,
    description: `Browse ${brandTitle} cars. Filter by category, year, search and sort options.`,
  };
}

type PageProps = {
  params: Promise<{ brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ params, searchParams }: PageProps) {
  // 1. Получаем параметры
  const { brand } = await params;

  if (!isBrand(brand)) return notFound();

  const rawSearchParams = await searchParams;

  const prefs = await getPreferences();

  const query = parseCatalogQuery(rawSearchParams);

  const effectiveQuery = {
    ...query,
    // если в URL не передали sort — возьмём из prefs
    sort: query.sort ?? prefs.catalog.sort,
    // если в URL не передали limit — возьмём из prefs
    limit: query.limit ?? prefs.catalog.limit,
  };

  const data = getProductsServer(brand, {
    q: effectiveQuery.q,
    category: effectiveQuery.category,
    year: effectiveQuery.year,
    sort: effectiveQuery.sort,
    page: effectiveQuery.page,
    limit: effectiveQuery.limit,
  });

  if (!data) return notFound();

  // 4. Подготавливаем пропсы
  const pathname = `/brand/${brand}/catalog`;

  return (
    <section className={styles.page}>
      <aside className={styles.sidebar}>
        <CatalogFilters
          categories={data.categories}
          years={data.years}
          initialQuery={effectiveQuery}
        />
      </aside>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Catalog</h1>

          <p className={styles.results}>
            Found: <b>{data?.total}</b> cars
          </p>
        </div>

        {data.items.length === 0 ? (
          <p className={styles.empty}>No results. Try changing filters.</p>
        ) : (
          <div className={styles.grid}>
            {data.items.map((p) => (
              <ProductCard key={p.id} brand={brand} product={p} />
            ))}
          </div>
        )}

        {data.totalPages > 1 && (
          <Pagination
            pathname={pathname}
            searchParams={rawSearchParams}
            page={data.currentPage}
            totalPages={data.totalPages}
          />
        )}
      </div>
    </section>
  );
}
