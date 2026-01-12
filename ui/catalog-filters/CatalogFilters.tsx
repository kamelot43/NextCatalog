'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './CatalogFilters.module.css';
import type {CatalogQuery, CatalogSort} from "@/shared/lib/catalog/catalogQuery";

type Props = {
    categories: string[];
    years: number[];
    initialQuery: CatalogQuery;
};

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
    { value: 'year-desc', label: 'Год: новые → старые' },
    { value: 'price-asc', label: 'Цена: ↑' },
    { value: 'price-desc', label: 'Цена: ↓' },
    { value: 'power-desc', label: 'Мощность: ↓' },
];

// Вспомогательная функция для установки или удаления параметра
function setSearchParam(params: URLSearchParams, key: string, value: string) {
    if (!value) {
        params.delete(key);
    } else {
        params.set(key, value);
    }
}


export default function CatalogFilters({ categories, years, initialQuery }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchParamsRef = useRef(searchParams.toString());

    // Локальное состояние для поискового запроса (для debounce)
    const [searchQuery, setSearchQuery] = useState(initialQuery.q);

    useEffect(() => {
          searchParamsRef.current = searchParams.toString();
    }, [searchParams]);

    // Синхронизация локального состояния поиска с URL при навигации
    useEffect(() => {
        const searchQueryFromUrl = searchParams.get('q') ?? '';
        setSearchQuery((prev) => (prev === searchQueryFromUrl ? prev : searchQueryFromUrl));
    }, [searchParams]);

    // Текущие значения из URL или начальные значения
    const currentCategory = searchParams.get('category') ?? initialQuery.category ?? '';
    const currentYear = searchParams.get('year') ?? (initialQuery.year ? String(initialQuery.year) : '');
    const urlSort = searchParams.get('sort') as CatalogSort | null;
    const effectiveSort = (urlSort ?? initialQuery.sort ?? 'year-desc') as CatalogSort;

    const activeChips = [
        currentCategory
            ? { key: 'category', label: `category: ${currentCategory}` }
            : null,
        currentYear
            ? { key: 'year', label: `year: ${currentYear}` }
            : null,
        urlSort && urlSort !== 'year-desc'
            ? { key: 'sort', label: `sort: ${urlSort}` }
            : null,
    ].filter(Boolean);

    // Функция для обновления URL
    function updateUrl(newParams: URLSearchParams) {
        const queryString = newParams.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        const currentQueryString = searchParams.toString();
        const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname;
        if (newUrl !== currentUrl) {
            router.push(newUrl);
        }
    }

    function removeParam(key: 'q' | 'category' | 'year' | 'sort') {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete(key);
        nextParams.set('page', '1');
        updateUrl(nextParams);
    }

    // Debounce для поискового запроса
    useEffect(() => {
          const debounceTimeout = setTimeout(() => {
          const currentParams = new URLSearchParams(searchParamsRef.current);
          const urlQ = currentParams.get('q') ?? '';
          const nextQ = searchQuery.trim();

          if (nextQ === urlQ) return;

          const nextParams = new URLSearchParams(searchParamsRef.current);
          setSearchParam(nextParams, 'q', nextQ);
          nextParams.set('page', '1');
          updateUrl(nextParams);
        }, 400);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery, pathname]);

    // Обработчики изменений фильтров
    function handleCategoryChange(selectedCategory: string) {
        const nextParams = new URLSearchParams(searchParams.toString());
        setSearchParam(nextParams, 'category', selectedCategory);
        nextParams.set('page', '1');
        updateUrl(nextParams);
    }

    function handleYearChange(selectedYear: string) {
        const nextParams = new URLSearchParams(searchParams.toString());
        setSearchParam(nextParams, 'year', selectedYear);
        nextParams.set('page', '1');
        updateUrl(nextParams);
    }

    function handleSortChange(selectedSort: CatalogSort) {
        const nextParams = new URLSearchParams(searchParams.toString());
        setSearchParam(nextParams, 'sort', selectedSort);
        nextParams.set('page', '1');
        updateUrl(nextParams);
    }

    function handleReset() {
        // Сбрасываем локальное состояние поиска
        setSearchQuery('');

        // Создаем новые параметры и удаляем все фильтры
        const clearedParams = new URLSearchParams(searchParams.toString());
        clearedParams.delete('q');
        clearedParams.delete('category');
        clearedParams.delete('year');
        clearedParams.delete('sort');
        clearedParams.delete('page');

        updateUrl(clearedParams);
    }

    return (
        <section className={styles.filters}>
            <p className={styles.title}>Фильтры</p>

            <label className={styles.field}>
                <span className={styles.label}>Поиск</span>
                <input
                    className={styles.input}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Например: Sedan"
                />
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Категория</span>
                <select
                    className={styles.select}
                    value={currentCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option value="">Все</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Год</span>
                <select
                    className={styles.select}
                    value={currentYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                >
                    <option value="">Все</option>
                    {years.map((y) => (
                        <option key={y} value={String(y)}>
                            {y}
                        </option>
                    ))}
                </select>
            </label>

            <label className={styles.field}>
                <span className={styles.label}>Сортировка</span>
                <select
                    className={styles.select}
                    value={effectiveSort}
                    onChange={(e) => handleSortChange(e.target.value as CatalogSort)}
                >
                    {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </label>

            {activeChips.length > 0 && (
                <div className={styles.chips}>
                    {activeChips.map((chip) => (
                        <span key={chip?.key} className={styles.chip}>
                        <span className={styles.chipText}>{chip?.label}</span>
                            <button
                                type="button"
                                className={styles.chipBtn}
                                aria-label={`Remove ${chip?.key}`}
                                onClick={() => removeParam(chip.key)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className={styles.actions}>
                <button type="button" className={styles.reset} onClick={handleReset}>
                    Сбросить
                </button>
            </div>
        </section>
    );

}
