export type Product = {
    id: string;
    brand: string;
    slug: string;
    title: string;
    price: number;
    currency: 'RUB' | 'USD';
    year: number;
    category: 'sedan' | 'suv' | 'hatchback';
    image?: string;
    specs: {
        powerHp: number;
        transmission: 'AT' | 'MT';
        drive: 'FWD' | 'RWD' | 'AWD';
    };
};

export const PRODUCTS_BY_BRAND: Record<string, Product[]> = {
    alpha: [
        {
            id: 'a-001',
            brand: 'alpha',
            slug: 'alpha-sedan-x',
            title: 'Alpha Sedan X',
            price: 2_490_000,
            currency: 'RUB',
            year: 2024,
            category: 'sedan',
            specs: { powerHp: 150, transmission: 'AT', drive: 'FWD' },
        },
        {
            id: 'a-002',
            brand: 'alpha',
            slug: 'alpha-suv-pro',
            title: 'Alpha SUV Pro',
            price: 3_290_000,
            currency: 'RUB',
            year: 2025,
            category: 'suv',
            specs: { powerHp: 190, transmission: 'AT', drive: 'AWD' },
        },
        {
            id: 'a-003',
            brand: 'alpha',
            slug: 'alpha-hatch-lite',
            title: 'Alpha Hatch Lite',
            price: 1_890_000,
            currency: 'RUB',
            year: 2023,
            category: 'hatchback',
            specs: { powerHp: 120, transmission: 'MT', drive: 'FWD' },
        },
    ],

    beta: [
        {
            id: 'b-001',
            brand: 'beta',
            slug: 'beta-sedan-s',
            title: 'Beta Sedan S',
            price: 24_900,
            currency: 'USD',
            year: 2024,
            category: 'sedan',
            specs: { powerHp: 160, transmission: 'AT', drive: 'FWD' },
        },
        {
            id: 'b-002',
            brand: 'beta',
            slug: 'beta-suv-max',
            title: 'Beta SUV Max',
            price: 33_500,
            currency: 'USD',
            year: 2025,
            category: 'suv',
            specs: { powerHp: 210, transmission: 'AT', drive: 'AWD' },
        },
        {
            id: 'b-003',
            brand: 'beta',
            slug: 'beta-hatch-city',
            title: 'Beta Hatch City',
            price: 19_800,
            currency: 'USD',
            year: 2023,
            category: 'hatchback',
            specs: { powerHp: 110, transmission: 'MT', drive: 'FWD' },
        },
    ],
};
