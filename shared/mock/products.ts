export type Brand = 'alpha' | 'beta';
export type Category = 'sedan' | 'suv' | 'hatchback' | 'coupe';
export type Currency = 'RUB' | 'USD';
export type Transmission = 'AT' | 'MT';
export type Drive = 'FWD' | 'RWD' | 'AWD';

export type Product = {
    id: string;
    brand: Brand;
    slug: string;
    title: string;
    price: number;
    currency: Currency;
    year: number;
    category: Category;
    image?: string;
    specs: {
        powerHp: number;
        transmission: Transmission;
        drive: Drive;
    };
};

// Генератор случайных данных
function generateProduct(
    brand: Brand,
    id: number,
    category: Category,
    baseYear: number,
    currency: Currency
): Product {
    const basePrice = currency === 'RUB'
        ? Math.floor(Math.random() * 3_000_000) + 1_500_000
        : Math.floor(Math.random() * 35_000) + 18_000;

    const year = baseYear - Math.floor(Math.random() * 3); // 2023-2025
    const modelNames = {
        sedan: ['Classic', 'Premium', 'Executive', 'Luxury', 'Sport'],
        suv: ['Explorer', 'Adventure', 'Trail', 'Urban', 'X-Treme'],
        hatchback: ['City', 'Compact', 'Urban', 'Style', 'Active'],
        coupe: ['GT', 'Sport', 'Turbo', 'Racing', 'Coupe']
    };

    const transmission: Transmission = Math.random() > 0.3 ? 'AT' : 'MT';
    const drives: Drive[] = ['FWD', 'RWD', 'AWD'];
    const drive = drives[Math.floor(Math.random() * drives.length)];

    const powerRange = {
        sedan: { min: 140, max: 250 },
        suv: { min: 180, max: 300 },
        hatchback: { min: 100, max: 180 },
        coupe: { min: 200, max: 350 }
    };

    const powerHp = Math.floor(
        Math.random() * (powerRange[category].max - powerRange[category].min + 1)
    ) + powerRange[category].min;

    const name = modelNames[category][Math.floor(Math.random() * modelNames[category].length)];

    return {
        id: `${brand[0]}-${id.toString().padStart(3, '0')}`,
        brand,
        slug: `${brand}-${category}-${name.toLowerCase().replace(' ', '-')}-${id}`,
        title: `${brand.charAt(0).toUpperCase() + brand.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)} ${name}`,
        price: Math.round(basePrice / 1000) * 1000, // Округляем до тысяч
        currency,
        year,
        category,
        specs: {
            powerHp,
            transmission,
            drive
        }
    };
}

// Генерация 20 автомобилей для каждого бренда
export const PRODUCTS_BY_BRAND: Record<Brand, Product[]> = {
    alpha: Array.from({ length: 20 }, (_, i) => {
        const categories: Category[] = ['sedan', 'suv', 'hatchback', 'coupe'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        return generateProduct('alpha', i + 1, category, 2025, 'RUB');
    }),

    beta: Array.from({ length: 20 }, (_, i) => {
        const categories: Category[] = ['sedan', 'suv', 'hatchback', 'coupe'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        return generateProduct('beta', i + 1, category, 2025, 'USD');
    })
};

// Вспомогательная функция для получения всех уникальных категорий
export function getAllCategories(): Category[] {
    const allCategories = new Set<Category>();
    Object.values(PRODUCTS_BY_BRAND).forEach(products => {
        products.forEach(product => allCategories.add(product.category));
    });
    return Array.from(allCategories);
}

// Вспомогательная функция для получения всех уникальных годов
export function getAllYears(): number[] {
    const allYears = new Set<number>();
    Object.values(PRODUCTS_BY_BRAND).forEach(products => {
        products.forEach(product => allYears.add(product.year));
    });
    return Array.from(allYears).sort((a, b) => b - a); // Сортировка по убыванию
}

// Вспомогательная функция для форматирования цены
export function formatPrice(product: Product): string {
    if (product.currency === 'RUB') {
        return `${(product.price / 1_000_000).toFixed(1)} млн ₽`;
    } else {
        return `$${product.price.toLocaleString()}`;
    }
}
