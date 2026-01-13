import { NextResponse } from 'next/server';
import { getProductsServer } from '@/server/catalog/getProducts';
import { CatalogSort } from '@/shared/lib/catalog/catalogQuery';

function toInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseYear(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(_req: Request, ctx: { params: Promise<{ brand: string }> }) {
  const { brand } = await ctx.params;

  const url = new URL(_req.url);
  const q = (url.searchParams.get('q') ?? '').trim();
  const category = url.searchParams.get('category') ?? undefined;
  const yearRaw = url.searchParams.get('year');
  const year = yearRaw ? parseYear(yearRaw) : undefined;

  const sortRaw = url.searchParams.get('sort');
  const sort = sortRaw as CatalogSort | undefined;
  const page = toInt(url.searchParams.get('page'), 1);
  const limit = toInt(url.searchParams.get('limit'), 6);

  const data = getProductsServer(brand, {
    q,
    category,
    year,
    sort,
    page,
    limit,
  });

  if (!data) {
    return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
