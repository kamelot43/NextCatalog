import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg' // 1. Импортируем адаптер для PostgreSQL
import { PRODUCTS_BY_BRAND } from '../shared/mock/products'

// 2. Создаём адаптер, передавая ему строку подключения
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

// 3. Создаём клиент с адаптером
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.product.deleteMany();

    const rows = Object.entries(PRODUCTS_BY_BRAND).flatMap(([brand, items]) =>
        items.map((p) => ({
            id: String(p.id),
            brand,
            slug: p.slug,
            title: p.title,
            category: p.category,
            year: p.year,
            priceRub: p.price,
            currency: p.currency ?? 'RUB',
            image: p.image ?? null,
            powerHp: p.specs.powerHp,
            transmission: p.specs.transmission,
            drive: p.specs.drive,
        })),
    );

    await prisma.product.createMany({ data: rows });
    console.log(`✅ Seeded: ${rows.length} products`);
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
