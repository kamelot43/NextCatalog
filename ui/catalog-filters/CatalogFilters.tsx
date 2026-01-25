'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, X } from 'lucide-react';
import type { CatalogQuery, CatalogSort } from '@/shared/lib/catalog/catalogQuery';

type Props = {
  categories: string[];
  years: number[];
  initialQuery: CatalogQuery;
};

const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: 'year-desc', label: 'Years: new → old' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'power-desc', label: 'Power: high to low' },
];

// Константы для "пустых" значений
const ALL_CATEGORIES = 'all';
const ALL_YEARS = 'all';

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

  const [searchQuery, setSearchQuery] = useState(initialQuery.q);

  useEffect(() => {
    searchParamsRef.current = searchParams.toString();
  }, [searchParams]);

  useEffect(() => {
    const searchQueryFromUrl = searchParams.get('q') ?? '';
    setSearchQuery((prev) => (prev === searchQueryFromUrl ? prev : searchQueryFromUrl));
  }, [searchParams]);

  // Получаем значения из URL и преобразуем "all" в пустую строку для логики
  const categoryFromUrl = searchParams.get('category');
  const yearFromUrl = searchParams.get('year');
  const urlSort = searchParams.get('sort') as CatalogSort | null;

  // Для отображения в Select используем "all" если значение пустое
  const currentCategory = categoryFromUrl ?? initialQuery.category ?? '';
  const currentYear = yearFromUrl ?? (initialQuery.year ? String(initialQuery.year) : '');

  // Преобразуем пустые значения в "all" для Select
  const displayCategory = currentCategory === '' ? ALL_CATEGORIES : currentCategory;
  const displayYear = currentYear === '' ? ALL_YEARS : currentYear;

  const effectiveSort = (urlSort ?? initialQuery.sort ?? 'year-desc') as CatalogSort;

  const activeChips = [
    currentCategory ? { key: 'category', label: `Category: ${currentCategory}` } : null,
    currentYear ? { key: 'year', label: `Year: ${currentYear}` } : null,
    urlSort && urlSort !== 'year-desc' ? { key: 'sort', label: `Sort: ${urlSort}` } : null,
  ].filter(Boolean);

  const updateUrl = useCallback((newParams: URLSearchParams) => {
    const queryString = newParams.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    const currentQueryString = searchParams.toString();
    const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname;
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [pathname, router, searchParams]);

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
  }, [searchQuery, pathname, updateUrl]);

  function handleCategoryChange(selectedCategory: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    // Если выбрано "all", удаляем параметр категории
    if (selectedCategory === ALL_CATEGORIES) {
      nextParams.delete('category');
    } else {
      setSearchParam(nextParams, 'category', selectedCategory);
    }

    nextParams.set('page', '1');
    updateUrl(nextParams);
  }

  function handleYearChange(selectedYear: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    // Если выбрано "all", удаляем параметр года
    if (selectedYear === ALL_YEARS) {
      nextParams.delete('year');
    } else {
      setSearchParam(nextParams, 'year', selectedYear);
    }

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
    setSearchQuery('');
    const clearedParams = new URLSearchParams(searchParams.toString());
    clearedParams.delete('q');
    clearedParams.delete('category');
    clearedParams.delete('year');
    clearedParams.delete('sort');
    clearedParams.delete('page');
    updateUrl(clearedParams);
  }

  return (
      <Card className="sticky top-2">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-1 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Search Input */}
          <div className="space-y-1 py-0.5">
            <Label htmlFor="search">Search</Label>
            <Input
                id="search"
                placeholder="Example: Sedan, BMW, Red..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
            />
          </div>

          <Separator />

          {/* Category Filter */}
          <div className="space-y-2 py-0.5">
            <Label htmlFor="category">Category</Label>
            <Select value={displayCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES}>All</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2 py-0.5">
            <Label htmlFor="year">Year</Label>
            <Select value={displayYear} onValueChange={handleYearChange}>
              <SelectTrigger id="year">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_YEARS}>All</SelectItem>
                {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="space-y-2 py-2">
            <Label htmlFor="sort">Sort by</Label>
            <Select value={effectiveSort} onValueChange={handleSortChange}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Select sort option" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {activeChips.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2 py-0.5">
                  <Label>Active filters</Label>
                  <div
                      className="flex flex-wrap gap-2 w-full break-all"
                      style={{flexWrap: 'wrap'}}
                  >
                    {activeChips.map((chip) => {
                      if (!chip) return null;
                      return (
                          <Badge
                              key={chip.key}
                              variant="secondary"
                              className="px-3 py-1 text-sm flex items-center gap-1"
                          >
                            {chip.label}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
                                style={{flexWrap: 'wrap'}}
                                onClick={() => removeParam(chip.key as 'q' | 'category' | 'year' | 'sort')}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                      );
                    })}
                  </div>
                </div>
              </>
          )}

          {/* Reset Button */}
          <Button
              type="button"
              variant="default"
              className="ml-4 bg-primary hover:bg-primary/90"
              style={{marginTop: '1rem'}}
              onClick={handleReset}
          >
            Reset all filters
          </Button>
        </CardContent>
      </Card>
  );
}
