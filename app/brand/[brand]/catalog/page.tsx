import styles from './CatalogPage.module.css';
import { getProducts } from '@/shared/api/products';
import { parseCatalogQuery } from "@/shared/lib/catalog/catalogQuery";
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';
import CatalogFilters from "@/ui/catalog-filters/CatalogFilters";
import {Pagination} from "@/ui/pagination/Pagination";
import {getCatalogData} from "@/shared/lib/catalog/catalogService";

type PageProps = {
    params: Promise<{ brand: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ params, searchParams}: PageProps) {
    // 1. Получаем параметры
    const { brand } = await params;
    const rawSearchParams = await searchParams;

    // 2. Получаем данные
    const products = await getProducts(brand);
    const query = parseCatalogQuery(rawSearchParams);

    // 3. Обрабатываем каталог через сервис
    const catalogData = getCatalogData(products, query);
    const { paginated, categories, years } = catalogData;

    // 4. Подготавливаем пропсы
    const pathname = `/brand/${brand}/catalog`;

    return (
        <section className={styles.page}>
            <aside className={styles.sidebar}>
                <CatalogFilters categories={categories} years={years} initialQuery={query} />
            </aside>

            <div className={styles.content}>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>{brand.toUpperCase()} Catalog</h1>

                    <p className={styles.results}>
                        Found: <b>{paginated.total}</b> cars
                        {paginated.totalPages > 1 && (
                            <span className={styles.results}>
                                • Page {paginated.currentPage} of {paginated.totalPages}
                            </span>
                        )}
                    </p>
                </div>

                {paginated.items.length === 0 ? (
                    <p className={styles.empty}>No results. Try changing filters.</p>
                ) : (
                    <div className={styles.grid}>
                        {paginated.items.map((p) => (
                            <ProductCard key={p.id} brand={brand} product={p} />
                        ))}
                    </div>
                )}

                {paginated.totalPages > 1 && (
                    <Pagination
                        pathname={pathname}
                        searchParams={rawSearchParams}
                        page={paginated.currentPage}
                        totalPages={paginated.totalPages}
                    />
                )}
            </div>
        </section>
    );
}
