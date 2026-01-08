export type Brand = 'alpha' | 'beta';
export type Category = 'sedan' | 'suv' | 'hatchback' | 'coupe';

export type Product = {
    id: string;
    brand: Brand;
    slug: string;
    title: string;
    price: number;
    currency: 'RUB' | 'USD';
    year: number;
    category: Category;
    image?: string;
    specs: {
        powerHp: number;
        transmission: 'AT' | 'MT';
        drive: 'FWD' | 'RWD' | 'AWD';
    };
};

export const PRODUCTS_BY_BRAND: Record<Brand, Product[]> = {
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
        {
            id: 'a-004',
            brand: 'alpha',
            slug: 'alpha-sedan-sport',
            title: 'Alpha Sedan Sport',
            price: 2_990_000,
            currency: 'RUB',
            year: 2025,
            category: 'sedan',
            specs: { powerHp: 180, transmission: 'AT', drive: 'RWD' },
        },
        {
            id: 'a-005',
            brand: 'alpha',
            slug: 'alpha-suv-urban',
            title: 'Alpha SUV Urban',
            price: 2_750_000,
            currency: 'RUB',
            year: 2024,
            category: 'suv',
            specs: { powerHp: 165, transmission: 'AT', drive: 'FWD' },
        },
        {
            id: 'a-006',
            brand: 'alpha',
            slug: 'alpha-hatch-plus',
            title: 'Alpha Hatch Plus',
            price: 2_050_000,
            currency: 'RUB',
            year: 2025,
            category: 'hatchback',
            specs: { powerHp: 135, transmission: 'AT', drive: 'FWD' },
        },
        {
            id: 'a-007',
            brand: 'alpha',
            slug: 'alpha-coupe-r',
            title: 'Alpha Coupe R',
            price: 3_450_000,
            currency: 'RUB',
            year: 2025,
            category: 'coupe',
            specs: { powerHp: 220, transmission: 'AT', drive: 'RWD' },
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
        {
            id: 'b-004',
            brand: 'beta',
            slug: 'beta-sedan-lux',
            title: 'Beta Sedan Lux',
            price: 28_400,
            currency: 'USD',
            year: 2025,
            category: 'sedan',
            specs: { powerHp: 175, transmission: 'AT', drive: 'RWD' },
        },
        {
            id: 'b-005',
            brand: 'beta',
            slug: 'beta-suv-trail',
            title: 'Beta SUV Trail',
            price: 36_800,
            currency: 'USD',
            year: 2024,
            category: 'suv',
            specs: { powerHp: 230, transmission: 'AT', drive: 'AWD' },
        },
        {
            id: 'b-006',
            brand: 'beta',
            slug: 'beta-hatch-plus',
            title: 'Beta Hatch Plus',
            price: 21_300,
            currency: 'USD',
            year: 2025,
            category: 'hatchback',
            specs: { powerHp: 130, transmission: 'AT', drive: 'FWD' },
        },
        {
            id: 'b-007',
            brand: 'beta',
            slug: 'beta-coupe-gt',
            title: 'Beta Coupe GT',
            price: 38_900,
            currency: 'USD',
            year: 2025,
            category: 'coupe',
            specs: { powerHp: 250, transmission: 'AT', drive: 'RWD' },
        },
    ],
};

