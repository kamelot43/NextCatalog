import { createStringArrayStorage } from '@/shared/helpers/storage/stringArrayStorage';

export const favoritesStorage = createStringArrayStorage('nextcatalog:favorites');

export const comparisonStorage = createStringArrayStorage('nextcatalog:comparison', {
    maxItems: 4,
});
