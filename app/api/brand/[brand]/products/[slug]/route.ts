import { NextResponse } from 'next/server';
import { getProductBySlugServer } from '@/server/catalog/getProductBySlug';

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ brand: string; slug: string }> }
) {
    const { brand, slug } = await ctx.params;

    const product = getProductBySlugServer(brand, slug);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
}
