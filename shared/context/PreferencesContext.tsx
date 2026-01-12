'use client';

import { createContext, useContext } from 'react';
import type { Preferences } from '@/server/actions/account';

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({
    value,
    children,
}: {
    value: Preferences;
    children: React.ReactNode;
}) {
    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const ctx = useContext(PreferencesContext);
    if (!ctx) {
        throw new Error('usePreferences must be used within PreferencesProvider');
    }
    return ctx;
}
