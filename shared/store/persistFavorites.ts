const KEY = 'nextcatalog:favorites';

export function loadFavoritesIds(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
    } catch {
        return [];
    }
}

export function saveFavoritesIds(ids: string[]) {
    try {
        window.localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
        // ignore
    }
}
