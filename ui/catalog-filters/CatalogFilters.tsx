'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './CatalogFilters.module.css';
import type {CatalogQuery, CatalogSort} from "@/shared/helpers/catalogQuery";

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

    // Локальное состояние для поискового запроса (для debounce)
    const [searchQuery, setSearchQuery] = useState(initialQuery.q);

    // Синхронизация локального состояния поиска с URL при навигации
    useEffect(() => {
        const searchQueryFromUrl = searchParams.get('q') ?? '';
        setSearchQuery(searchQueryFromUrl);
    }, [searchParams]);

    // Текущие значения из URL или начальные значения
    const currentCategory = searchParams.get('category') ?? initialQuery.category ?? '';
    const currentYear = searchParams.get('year') ?? (initialQuery.year ? String(initialQuery.year) : '');
    const currentSort = (searchParams.get('sort') as CatalogSort) ?? initialQuery.sort;

    const activeChips = [
        currentCategory
            ? { key: 'category', label: `category: ${currentCategory}` }
            : null,
        currentYear
            ? { key: 'year', label: `year: ${currentYear}` }
            : null,
        currentSort && currentSort !== 'year-desc'
            ? { key: 'sort', label: `sort: ${currentSort}` }
            : null,
    ].filter(Boolean);

    console.log('chips', activeChips);

    // Базовые параметры для новых URL (сохраняем неизвестные параметры)
    const baseSearchParams = useMemo(() => {
        return new URLSearchParams(searchParams.toString());
    }, [searchParams]);

    // Функция для обновления URL
    function updateUrl(newParams: URLSearchParams) {
        const queryString = newParams.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newUrl);
    }

    function removeParam(key: 'q' | 'category' | 'year' | 'sort') {
        const nextParams = new URLSearchParams(baseSearchParams);
        nextParams.delete(key);
        updateUrl(nextParams);
    }

    // Debounce для поискового запроса
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            const nextParams = new URLSearchParams(baseSearchParams);
            setSearchParam(nextParams, 'q', searchQuery.trim());
            updateUrl(nextParams);
        }, 400);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    // Обработчики изменений фильтров
    function handleCategoryChange(selectedCategory: string) {
        const nextParams = new URLSearchParams(baseSearchParams);
        setSearchParam(nextParams, 'category', selectedCategory);
        updateUrl(nextParams);
    }

    function handleYearChange(selectedYear: string) {
        const nextParams = new URLSearchParams(baseSearchParams);
        setSearchParam(nextParams, 'year', selectedYear);
        updateUrl(nextParams);
    }

    function handleSortChange(selectedSort: CatalogSort) {
        const nextParams = new URLSearchParams(baseSearchParams);
        setSearchParam(nextParams, 'sort', selectedSort);
        updateUrl(nextParams);
    }

    function handleReset() {
        // Сбрасываем локальное состояние поиска
        setSearchQuery('');

        // Создаем новые параметры и удаляем все фильтры
        const clearedParams = new URLSearchParams(baseSearchParams);
        clearedParams.delete('q');
        clearedParams.delete('category');
        clearedParams.delete('year');
        clearedParams.delete('sort');

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
                    value={currentSort}
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
