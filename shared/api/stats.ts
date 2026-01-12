import type { BrandStats } from '@/server/stats/getBrandStats';

export async function getBrandStats(brand: string): Promise<BrandStats> {
    const res = await fetch(`/api/brand/${brand}/stats`);
    if (res.status === 404) {
        throw new Error('NOT_FOUND');
    }
    if (!res.ok) {
        throw new Error(`Failed to load stats: ${res.status}`);
    }
    return res.json();
}
