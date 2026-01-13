type SearchParams = Record<string, string | string[] | undefined>;

export type CatalogSort = 'price-asc' | 'price-desc' | 'power-desc' | 'year-desc';

export type CatalogQuery = {
  q: string;
  category?: string;
  year?: number;
  sort?: CatalogSort;
  page: number;
  limit?: number;
};

function getParam(sp: SearchParams, key: string): string | undefined {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

export function parseCatalogQuery(searchParams: SearchParams): CatalogQuery {
  const q = (getParam(searchParams, 'q') ?? '').trim();

  const categoryRaw = getParam(searchParams, 'category');
  const category = categoryRaw ? categoryRaw.trim() : undefined;

  const yearRaw = getParam(searchParams, 'year');
  const yearNum = yearRaw ? Number(yearRaw) : undefined;
  const year = yearNum && Number.isFinite(yearNum) ? yearNum : undefined;

  const sortRaw = getParam(searchParams, 'sort');
  const sort: CatalogSort | undefined =
    sortRaw === 'price-asc' ||
    sortRaw === 'price-desc' ||
    sortRaw === 'power-desc' ||
    sortRaw === 'year-desc'
      ? sortRaw
      : undefined;

  const pageRaw = getParam(searchParams, 'page');
  const pageNum = pageRaw ? Number(pageRaw) : 1;
  const page = pageNum > 0 ? pageNum : 1;

  const limitRaw = getParam(searchParams, 'limit');
  const limitNum = limitRaw ? Number(limitRaw) : undefined;
  const limit =
    limitNum && Number.isFinite(limitNum) && limitNum > 0 && limitNum <= 100 ? limitNum : undefined;

  return { q, category, year, sort, page, limit };
}
