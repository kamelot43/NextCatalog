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

export const PRODUCTS_BY_BRAND: Record<Brand, Product[]> = {
  alpha: [
    {
      id: 'a-001',
      brand: 'alpha',
      slug: 'alpha-hatchback-urban-1', // Изменено: suv -> hatchback
      title: 'Alpha Hatchback Urban', // Изменено: Suv -> Hatchback
      price: 2368000,
      currency: 'RUB',
      year: 2020,
      category: 'hatchback', // Изменено: suv -> hatchback
      specs: {
        powerHp: 265,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'a-002',
      brand: 'alpha',
      slug: 'alpha-hatchback-active-2',
      title: 'Alpha Hatchback Active',
      price: 3968000,
      currency: 'RUB',
      year: 2024,
      category: 'hatchback',
      specs: {
        powerHp: 117,
        transmission: 'MT',
        drive: 'AWD',
      },
    },
    {
      id: 'a-003',
      brand: 'alpha',
      slug: 'alpha-sedan-premium-3',
      title: 'Alpha Sedan Premium',
      price: 3370000,
      currency: 'RUB',
      year: 2025,
      category: 'sedan',
      specs: {
        powerHp: 208,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-004',
      brand: 'alpha',
      slug: 'alpha-coupe-gt-4',
      title: 'Alpha Coupe GT',
      price: 3346000,
      currency: 'RUB',
      year: 2023,
      category: 'coupe',
      specs: {
        powerHp: 244,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-005',
      brand: 'alpha',
      slug: 'alpha-hatchback-city-5',
      title: 'Alpha Hatchback City',
      price: 4240000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 174,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-006',
      brand: 'alpha',
      slug: 'alpha-hatchback-urban-6',
      title: 'Alpha Hatchback Urban',
      price: 4298000,
      currency: 'RUB',
      year: 2025,
      category: 'hatchback',
      specs: {
        powerHp: 154,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'a-007',
      brand: 'alpha',
      slug: 'alpha-sedan-luxury-7',
      title: 'Alpha Sedan Luxury',
      price: 3144000,
      currency: 'RUB',
      year: 2025,
      category: 'sedan',
      specs: {
        powerHp: 211,
        transmission: 'MT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-008',
      brand: 'alpha',
      slug: 'alpha-coupe-gt-8',
      title: 'Alpha Coupe GT',
      price: 4019000,
      currency: 'RUB',
      year: 2024,
      category: 'coupe',
      specs: {
        powerHp: 316,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'a-009',
      brand: 'alpha',
      slug: 'alpha-sedan-sport-9',
      title: 'Alpha Sedan Sport',
      price: 3181000,
      currency: 'RUB',
      year: 2025,
      category: 'sedan',
      specs: {
        powerHp: 230,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'a-010',
      brand: 'alpha',
      slug: 'alpha-hatchback-explorer-10', // Изменено: suv -> hatchback
      title: 'Alpha Hatchback Explorer', // Изменено: Suv -> Hatchback
      price: 1776000,
      currency: 'RUB',
      year: 2025,
      category: 'hatchback', // Изменено: suv -> hatchback
      specs: {
        powerHp: 293,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-011',
      brand: 'alpha',
      slug: 'alpha-hatchback-explorer-11', // Изменено: suv -> hatchback
      title: 'Alpha Hatchback Explorer', // Изменено: Suv -> Hatchback
      price: 1826000,
      currency: 'RUB',
      year: 2024,
      category: 'hatchback', // Изменено: suv -> hatchback
      specs: {
        powerHp: 222,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-012',
      brand: 'alpha',
      slug: 'alpha-sedan-classic-12',
      title: 'Alpha Sedan Classic',
      price: 4447000,
      currency: 'RUB',
      year: 2023,
      category: 'sedan',
      specs: {
        powerHp: 187,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'a-013',
      brand: 'alpha',
      slug: 'alpha-hatchback-urban-13', // Изменено: suv -> hatchback
      title: 'Alpha Hatchback Urban', // Изменено: Suv -> Hatchback
      price: 3637000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback', // Изменено: suv -> hatchback
      specs: {
        powerHp: 222,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'a-014',
      brand: 'alpha',
      slug: 'alpha-coupe-sport-14',
      title: 'Alpha Coupe Sport',
      price: 2077000,
      currency: 'RUB',
      year: 2025,
      category: 'coupe',
      specs: {
        powerHp: 350,
        transmission: 'MT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-015',
      brand: 'alpha',
      slug: 'alpha-coupe-racing-15',
      title: 'Alpha Coupe Racing',
      price: 3322000,
      currency: 'RUB',
      year: 2024,
      category: 'coupe',
      specs: {
        powerHp: 268,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'a-016',
      brand: 'alpha',
      slug: 'alpha-hatchback-active-16',
      title: 'Alpha Hatchback Active',
      price: 3666000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 138,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'a-017',
      brand: 'alpha',
      slug: 'alpha-sedan-premium-17',
      title: 'Alpha Sedan Premium',
      price: 1763000,
      currency: 'RUB',
      year: 2023,
      category: 'sedan',
      specs: {
        powerHp: 169,
        transmission: 'MT',
        drive: 'FWD',
      },
    },
    {
      id: 'a-018',
      brand: 'alpha',
      slug: 'alpha-hatchback-explorer-18', // Изменено: suv -> hatchback
      title: 'Alpha Hatchback Explorer', // Изменено: Suv -> Hatchback
      price: 3256000,
      currency: 'RUB',
      year: 2024,
      category: 'hatchback', // Изменено: suv -> hatchback
      specs: {
        powerHp: 197,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
  ],

  beta: [
    {
      id: 'b-001',
      brand: 'beta',
      slug: 'beta-coupe-turbo-1',
      title: 'Beta Coupe Turbo',
      price: 4250000,
      currency: 'RUB',
      year: 2025,
      category: 'coupe',
      specs: {
        powerHp: 264,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'b-002',
      brand: 'beta',
      slug: 'beta-hatchback-urban-2',
      title: 'Beta Hatchback Urban',
      price: 4940000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 156,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-003',
      brand: 'beta',
      slug: 'beta-sedan-classic-3',
      title: 'Beta Sedan Classic',
      price: 6460000,
      currency: 'RUB',
      year: 2024,
      category: 'sedan',
      specs: {
        powerHp: 213,
        transmission: 'MT',
        drive: 'FWD',
      },
    },
    {
      id: 'b-004',
      brand: 'beta',
      slug: 'beta-hatchback-active-4',
      title: 'Beta Hatchback Active',
      price: 5130000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 167,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-005',
      brand: 'beta',
      slug: 'beta-sedan-premium-5',
      title: 'Beta Sedan Premium',
      price: 6840000,
      currency: 'RUB',
      year: 2023,
      category: 'sedan',
      specs: {
        powerHp: 151,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-006',
      brand: 'beta',
      slug: 'beta-coupe-racing-6',
      title: 'Beta Coupe Racing',
      price: 8075000,
      currency: 'RUB',
      year: 2025,
      category: 'coupe',
      specs: {
        powerHp: 260,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'b-007',
      brand: 'beta',
      slug: 'beta-suv-explorer-7',
      title: 'Beta Suv Explorer',
      price: 7410000,
      currency: 'RUB',
      year: 2025,
      category: 'suv',
      specs: {
        powerHp: 293,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-008',
      brand: 'beta',
      slug: 'beta-suv-adventure-8',
      title: 'Beta Suv Adventure',
      price: 7790000,
      currency: 'RUB',
      year: 2024,
      category: 'suv',
      specs: {
        powerHp: 270,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-009',
      brand: 'beta',
      slug: 'beta-sedan-luxury-9',
      title: 'Beta Sedan Luxury',
      price: 9025000,
      currency: 'RUB',
      year: 2025,
      category: 'sedan',
      specs: {
        powerHp: 246,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'b-010',
      brand: 'beta',
      slug: 'beta-coupe-sport-10',
      title: 'Beta Coupe Sport',
      price: 6745000,
      currency: 'RUB',
      year: 2025,
      category: 'coupe',
      specs: {
        powerHp: 236,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-011',
      brand: 'beta',
      slug: 'beta-hatchback-style-11',
      title: 'Beta Hatchback Style',
      price: 4560000,
      currency: 'RUB',
      year: 2025,
      category: 'hatchback',
      specs: {
        powerHp: 158,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'b-012',
      brand: 'beta',
      slug: 'beta-sedan-sport-12',
      title: 'Beta Sedan Sport',
      price: 6270000,
      currency: 'RUB',
      year: 2025,
      category: 'sedan',
      specs: {
        powerHp: 193,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'b-013',
      brand: 'beta',
      slug: 'beta-hatchback-active-13',
      title: 'Beta Hatchback Active',
      price: 5035000,
      currency: 'RUB',
      year: 2024,
      category: 'hatchback',
      specs: {
        powerHp: 180,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'b-014',
      brand: 'beta',
      slug: 'beta-coupe-turbo-14',
      title: 'Beta Coupe Turbo',
      price: 8455000,
      currency: 'RUB',
      year: 2023,
      category: 'coupe',
      specs: {
        powerHp: 303,
        transmission: 'AT',
        drive: 'AWD',
      },
    },
    {
      id: 'b-015',
      brand: 'beta',
      slug: 'beta-coupe-turbo-15',
      title: 'Beta Coupe Turbo',
      price: 8740000,
      currency: 'RUB',
      year: 2023,
      category: 'coupe',
      specs: {
        powerHp: 290,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-016',
      brand: 'beta',
      slug: 'beta-hatchback-active-16',
      title: 'Beta Hatchback Active',
      price: 4845000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 160,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-017',
      brand: 'beta',
      slug: 'beta-sedan-sport-17',
      title: 'Beta Sedan Sport',
      price: 5985000,
      currency: 'RUB',
      year: 2023,
      category: 'sedan',
      specs: {
        powerHp: 204,
        transmission: 'MT',
        drive: 'FWD',
      },
    },
    {
      id: 'b-018',
      brand: 'beta',
      slug: 'beta-hatchback-city-18',
      title: 'Beta Hatchback City',
      price: 4275000,
      currency: 'RUB',
      year: 2023,
      category: 'hatchback',
      specs: {
        powerHp: 109,
        transmission: 'AT',
        drive: 'FWD',
      },
    },
    {
      id: 'b-019',
      brand: 'beta',
      slug: 'beta-sedan-sport-19',
      title: 'Beta Sedan Sport',
      price: 5605000,
      currency: 'RUB',
      year: 2023,
      category: 'sedan',
      specs: {
        powerHp: 149,
        transmission: 'MT',
        drive: 'RWD',
      },
    },
    {
      id: 'b-020',
      brand: 'beta',
      slug: 'beta-hatchback-active-20',
      title: 'Beta Hatchback Active',
      price: 4465000,
      currency: 'RUB',
      year: 2024,
      category: 'hatchback',
      specs: {
        powerHp: 141,
        transmission: 'AT',
        drive: 'RWD',
      },
    },
  ],

};

// Вспомогательная функция для получения всех уникальных категорий
export function getAllCategories(): Category[] {
  const allCategories = new Set<Category>();
  Object.values(PRODUCTS_BY_BRAND).forEach((products) => {
    products.forEach((product) => allCategories.add(product.category));
  });
  return Array.from(allCategories);
}

// Вспомогательная функция для получения всех уникальных годов
export function getAllYears(): number[] {
  const allYears = new Set<number>();
  Object.values(PRODUCTS_BY_BRAND).forEach((products) => {
    products.forEach((product) => allYears.add(product.year));
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
