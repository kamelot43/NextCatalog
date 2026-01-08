type Options = {
    maxItems?: number;
};

export function createStringArrayStorage(key: string, options: Options = {}) {
    const { maxItems } = options;

    function load(): string[] {
        if (typeof window === 'undefined') return [];
        try {
            const raw = window.localStorage.getItem(key);
            if (!raw) return [];
            const parsed = JSON.parse(raw);

            const arr = Array.isArray(parsed)
                ? parsed.filter((x) => typeof x === 'string')
                : [];

            return typeof maxItems === 'number' ? arr.slice(0, maxItems) : arr;
        } catch {
            return [];
        }
    }

    function save(ids: string[]) {
        try {
            const data = typeof maxItems === 'number' ? ids.slice(0, maxItems) : ids;
            window.localStorage.setItem(key, JSON.stringify(data));
        } catch {
            // ignore
        }
    }

    function clear() {
        try {
            window.localStorage.removeItem(key);
        } catch {
            // ignore
        }
    }

    return { load, save, clear };
}
