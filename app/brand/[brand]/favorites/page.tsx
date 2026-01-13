import styles from './FavoritesPage.module.css';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { isBrand } from '@/shared/config/brands';

import { FavoritesList } from '@/ui/favorites/FavoritesList/FavoritesList';

import { getFavoritesMap } from '@/server/actions/preferences';
import { getAllProductsByBrandServer } from '@/server/catalog/getAllProductsByBrand';
import { selectProductsByIds } from '@/server/catalog/selectProductsByIds';

export const dynamic = 'force-dynamic';

function toBrandTitle(brand: string) {
  return brand ? brand[0].toUpperCase() + brand.slice(1) : 'Brand';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  const brandTitle = toBrandTitle(brand);

  return {
    title: `${brandTitle} • Favorites`,
    description: `Your saved ${brandTitle} cars. Quickly return to models you liked.`,
  };
}

export default async function FavoritesPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  if (!isBrand(brand)) return notFound();

  const [favoritesMap] = await Promise.all([getFavoritesMap()]);

  const ids = favoritesMap[brand] ?? [];

  const all = await getAllProductsByBrandServer(brand);
  if (!all) return notFound();

  const products = selectProductsByIds(all, ids);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>
      <FavoritesList brand={brand} products={products} />
    </section>
  );
}
