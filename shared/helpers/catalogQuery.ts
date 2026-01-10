export type CatalogSort = 'price-asc' | 'price-desc' | 'year-desc' | 'power-desc';

export type CatalogQuery = {
    q: string;
    category?: string;
    year?: number;
    sort: CatalogSort;
    page: number;
    limit: number;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

const DEFAULT_SORT: CatalogSort = 'year-desc';

function getFirst(sp: RawSearchParams, key: string): string | undefined {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
}

function toInt(value: unknown, fallback: number) {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export function parseCatalogQuery(searchParams: RawSearchParams): CatalogQuery {
    const q = (getFirst(searchParams, 'q') ?? '').trim();

    const categoryRaw = getFirst(searchParams, 'category');
    const category = categoryRaw ? categoryRaw.trim() : undefined;

    const yearRaw = getFirst(searchParams, 'year');
    const yearNum = yearRaw ? Number(yearRaw) : undefined;
    const year = yearNum && Number.isFinite(yearNum) ? yearNum : undefined;

    const page = toInt(getFirst(searchParams, 'page'), 1);
    const limit = toInt(getFirst(searchParams, 'limit'), 5);

    const sortRaw = getFirst(searchParams, 'sort');
    const sort: CatalogSort = (
        sortRaw === 'price-asc' ||
        sortRaw === 'price-desc' ||
        sortRaw === 'year-desc' ||
        sortRaw === 'power-desc'
    )
        ? sortRaw
        : DEFAULT_SORT;

    return { q, category, year, sort , page, limit};
}
