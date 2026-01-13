import { NextResponse } from 'next/server';
import { getBrandStatsServer } from '@/server/stats/getBrandStats';

export async function GET(_req: Request, ctx: { params: Promise<{ brand: string }> }) {
  const { brand } = await ctx.params;

  const stats = getBrandStatsServer(brand);
  if (!stats) {
    return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
  }

  return NextResponse.json(stats, { status: 200 });
}
