'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { favoritesStorage, comparisonStorage } from '@/shared/helpers/storage/persist';
import { hydrateFavorites } from '@/features/favorites/model/favoritesSlice';
import { hydrateCompare } from '@/features/comparison/model/comparisonSlice';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        store.dispatch(hydrateFavorites(favoritesStorage.load()));
        store.dispatch(hydrateCompare(comparisonStorage.load()));

        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            favoritesStorage.save(state.favorites.ids);
            comparisonStorage.save(state.comparison.ids);
        });

        return unsubscribe;
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
