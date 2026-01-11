export const BRANDS = ['alpha', 'beta'] as const;
export type Brand = 'alpha' | 'beta';

export function isBrand(value: string): value is Brand {
    return BRANDS.includes(value as Brand);
}
