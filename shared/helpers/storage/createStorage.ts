export function createStorage<T>(key: string, fallback: T) {
    return {
        load(): T {
            if (typeof window === 'undefined') return fallback;
            const raw = window.localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw) as T;
        },
        save(value: T) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        clear() {
            window.localStorage.removeItem(key);
        },
    };
}
