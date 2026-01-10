import { createStorage } from '@/shared/lib/storage/createStorage';

export const favoritesByBrandStorage = createStorage<Record<string, string[]>>(
    'nextcatalog:favoritesByBrand',
    {}
);

export const comparisonByBrandStorage = createStorage<Record<string, string[]>>(
    'nextcatalog:comparisonByBrand',
    {}
);
