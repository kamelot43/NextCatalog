'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { loadFavoritesIds, saveFavoritesIds } from './persistFavorites';
import { hydrateFavorites } from '@/features/favorites/model/favoritesSlice';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        store.dispatch(hydrateFavorites(loadFavoritesIds()));

        const unsubscribe = store.subscribe(() => {
            const ids = store.getState().favorites.ids;
            saveFavoritesIds(ids);
        });

        return unsubscribe;
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
