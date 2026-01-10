import styles from './CatalogPage.module.css';
import { getProducts } from '@/shared/api/products';
import { parseCatalogQuery } from "@/shared/helpers/catalogQuery";
import { ProductCard } from '@/ui/product/ProductCard/ProductCard';
import CatalogFilters from "@/ui/catalog-filters/CatalogFilters";

type PageProps = {
    params: Promise<{ brand: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ params, searchParams}: PageProps) {
    const { brand } = await params;
    const sp = await searchParams;
    const products = await getProducts(brand);

    const query = parseCatalogQuery(sp);
    const { q, category, year, sort } = query;

    const categories = Array.from(new Set(products.map((p) => p.category))).sort();
    const years = Array.from(new Set(products.map((p) => p.year))).sort((a, b) => b - a);

    // 1) фильтрация
    let items = products;

    if (q) {
        const queryLower = q.toLowerCase();
        items = items.filter((p) => p.title.toLowerCase().includes(queryLower));
    }

    if (category) {
        items = items.filter((p) => p.category === category);
    }

    if (year) {
        items = items.filter((p) => p.year === year);
    }

    // сортировка
    items = [...items]; // сортировка не должна мутировать исходный массив
    switch (sort) {
        case 'price-asc':
            items.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            items.sort((a, b) => b.price - a.price);
            break;
        case 'power-desc':
            items.sort((a, b) => b.specs.powerHp - a.specs.powerHp);
            break;
        case 'year-desc':
        default:
            items.sort((a, b) => b.year - a.year);
            break;
    }

    return (
        <section className={styles.page}>
            <aside className={styles.sidebar}>
                <CatalogFilters categories={categories} years={years} initialQuery={query} />
            </aside>

            <div className={styles.content}>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>Catalog</h1>

                    <p className={styles.results}>
                        Results: <b>{items.length}</b>
                    </p>
                </div>

                {items.length === 0 ? (
                    <p className={styles.empty}>No results. Try changing filters.</p>
                ) : (
                    <div className={styles.grid}>
                        {items.map((p) => (
                            <ProductCard key={p.id} brand={brand} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
