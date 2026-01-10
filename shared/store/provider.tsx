'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { favoritesByBrandStorage, comparisonByBrandStorage} from '@/shared/lib/storage/persist';
import { hydrateFavorites } from '@/features/favorites/model/favoritesSlice';
import { hydrateCompare } from '@/features/comparison/model/comparisonSlice';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        store.dispatch(hydrateFavorites(favoritesByBrandStorage.load()));
        store.dispatch(hydrateCompare(comparisonByBrandStorage.load()));

        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            favoritesByBrandStorage.save(state.favorites.idsByBrand);
            comparisonByBrandStorage.save(state.comparison.idsByBrand);
        });

        return unsubscribe;
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
