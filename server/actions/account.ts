'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { isBrand } from '@/shared/config/brands';
import { AvatarId } from '@/shared/config/avatars';

const PROFILE_COOKIE = 'profile_v1';
const PREFS_COOKIE = 'prefs_v1';

export type Profile = {
  displayName: string;
  email?: string;
  avatarId?: AvatarId;
  updatedAt: number;
};

type CatalogSort = 'price-asc' | 'price-desc' | 'power-desc' | 'year-desc';

export type Preferences = {
  locale: 'ru-RU' | 'en-US';
  currency: 'RUB' | 'USD' | 'EUR';
  catalog: {
    limit: 6 | 12 | 24;
    sort: CatalogSort;
  };
};

const defaultProfile: Profile = {
  displayName: '',
  avatarId: 'a1',
  updatedAt: Date.now(),
};

const defaultPrefs: Preferences = {
  locale: 'ru-RU',
  currency: 'RUB',
  catalog: {
    limit: 6,
    sort: 'year-desc',
  },
};

async function readJsonCookie<T>(name: string, fallback: T): Promise<T> {
  const jar = await cookies();
  const raw = jar.get(name)?.value;
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonCookie<T>(name: string, value: T): Promise<void> {
  const jar = await cookies();
  jar.set(name, JSON.stringify(value), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getProfile(): Promise<Profile> {
  return readJsonCookie(PROFILE_COOKIE, defaultProfile);
}

export async function getPreferences(): Promise<Preferences> {
  const raw = await readJsonCookie<Partial<Preferences>>(PREFS_COOKIE, {});
  return normalizePrefs(raw);
}

function normalizePrefs(raw: Partial<Preferences>): Preferences {
  const locale = raw.locale === 'en-US' ? 'en-US' : 'ru-RU';
  const currency = raw.currency === 'USD' ? 'USD' : raw.currency === 'EUR' ? 'EUR' : 'RUB';

  const rawCatalog = (raw as any).catalog ?? {};
  const limit = rawCatalog.limit === 12 ? 12 : rawCatalog.limit === 24 ? 24 : 6;

  let sort: CatalogSort;

  switch (rawCatalog.sort) {
    case 'price-asc':
    case 'price-desc':
    case 'power-desc':
    case 'year-desc':
      sort = rawCatalog.sort;
      break;
    default:
      sort = 'year-desc';
  }

  return {
    locale,
    currency,
    catalog: { limit, sort },
  };
}

function clampCatalogLimit(v: string | null): 6 | 12 | 24 {
  if (v === '12') return 12;
  if (v === '24') return 24;
  return 6;
}

function clampLocale(v: string | null): Preferences['locale'] {
  return v === 'en-US' ? 'en-US' : 'ru-RU';
}

function clampCurrency(v: string | null): Preferences['currency'] {
  if (v === 'USD') return 'USD';
  if (v === 'EUR') return 'EUR';
  return 'RUB';
}

function clampSort(v: string | null): Preferences['catalog']['sort'] {
  if (v === 'price-asc') return 'price-asc';
  if (v === 'price-desc') return 'price-desc';
  if (v === 'power-desc') return 'power-desc';
  return 'year-desc';
}

export async function updateProfileAction(brand: string, formData: FormData) {
  if (!isBrand(brand)) return { ok: false as const };

  const displayName = String(formData.get('displayName') ?? '')
    .trim()
    .slice(0, 40);
  const emailRaw = String(formData.get('email') ?? '')
    .trim()
    .slice(0, 80);
  const avatarIdRaw = String(formData.get('avatarId') ?? '').trim();

  const avatarId: AvatarId =
    avatarIdRaw === 'a1' ||
    avatarIdRaw === 'a2' ||
    avatarIdRaw === 'a3' ||
    avatarIdRaw === 'a4' ||
    avatarIdRaw === 'a5' ||
    avatarIdRaw === 'a6' ||
    avatarIdRaw === 'a7' ||
    avatarIdRaw === 'a8' ||
    avatarIdRaw === 'a9'
      ? avatarIdRaw
      : 'a1';

  const next: Profile = {
    displayName,
    email: emailRaw.length ? emailRaw : undefined,
    avatarId,
    updatedAt: Date.now(),
  };

  await writeJsonCookie(PROFILE_COOKIE, next);

  revalidatePath(`/brand/${brand}/account`);
  return { ok: true as const, profile: next };
}

export async function updatePreferencesAction(brand: string, formData: FormData) {
  if (!isBrand(brand)) return { ok: false, prefs: defaultPrefs };

  const raw = {
    locale: String(formData.get('locale') ?? ''),
    currency: String(formData.get('currency') ?? ''),
    catalog: {
      limit: Number(formData.get('catalogLimit') ?? 6),
      sort: String(formData.get('catalogSort') ?? ''),
    },
  };

  const next = normalizePrefs(raw as any);

  await writeJsonCookie(PREFS_COOKIE, next);
  revalidatePath(`/brand/${brand}/account`);

  return { ok: true as const, prefs: next };
}

export async function resetAccountAction(brand: string) {
  if (!isBrand(brand)) return { ok: false as const };

  const profile = { ...defaultProfile, updatedAt: Date.now() };
  const prefs = defaultPrefs;

  await writeJsonCookie(PROFILE_COOKIE, profile);
  await writeJsonCookie(PREFS_COOKIE, prefs);

  revalidatePath(`/brand/${brand}/account`);
  return { ok: true, profile, prefs };
}
