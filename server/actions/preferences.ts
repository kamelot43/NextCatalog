'use server';

import { cookies } from 'next/headers';
import { isBrand } from '@/shared/config/brands';

type IdsByBrand = Record<string, string[]>;

const FAVORITES_COOKIE = 'favorites_v1';
const COMPARE_COOKIE = 'compare_v1';

async function readMap(name: string): Promise<IdsByBrand> {
    const jar = await cookies();
    const raw = jar.get(name)?.value;
    if (!raw) return {};

    try {
        const obj = JSON.parse(raw);
        return obj && typeof obj === 'object' ? (obj as IdsByBrand) : {};
    } catch {
        return {};
    }
}

async function writeMap(name: string, map: IdsByBrand): Promise<void> {
    const jar = await cookies();
    jar.set(name, JSON.stringify(map), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    });
}

function toggle(map: IdsByBrand, brand: string, id: string, max?: number) {
    const list = map[brand] ?? [];
    const exists = list.includes(id);

    if (exists) {
        map[brand] = list.filter((x) => x !== id);
        return { map, blocked: false };
    }

    if (typeof max === 'number' && list.length >= max) {
        return { map, blocked: true };
    }

    map[brand] = [...list, id];
    return { map, blocked: false };
}

export async function getFavoritesMap(): Promise<IdsByBrand> {
    return readMap(FAVORITES_COOKIE);
}

export async function getCompareMap(): Promise<IdsByBrand> {
    return readMap(COMPARE_COOKIE);
}

export async function toggleFavoriteCookie(brand: string, productId: string) {
    if (!isBrand(brand)) return { ok: false, map };

    const map = await readMap(FAVORITES_COOKIE);
    const { map: next } = toggle(map, brand, productId);

    await writeMap(FAVORITES_COOKIE, next);
    return { ok: true, map: next };
}

export async function toggleCompareCookie(brand: string, productId: string) {
    if (!isBrand(brand)) return { ok: false, map };

    const map = await readMap(COMPARE_COOKIE);
    const { map: next, blocked } = toggle(map, brand, productId, 4);

    if (blocked) {
        return { ok: false, reason: 'LIMIT', map: next };
    }

    await writeMap(COMPARE_COOKIE, next);
    return { ok: true, map: next };
}

export async function clearCompareCookie(brand: string) {
    const map = await readMap(COMPARE_COOKIE);
    if (!isBrand(brand)) return { ok: false, map };

    map[brand] = [];
    await writeMap(COMPARE_COOKIE, map);

    return { ok: true, map };
}

export async function clearFavoritesCookie(brand: string) {
    const map = await readMap(FAVORITES_COOKIE);
    if (!isBrand(brand)) return { ok: false, map };

    map[brand] = [];
    await writeMap(FAVORITES_COOKIE, map);

    return { ok: true, map };
}

