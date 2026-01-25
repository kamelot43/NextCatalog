// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { PRODUCTS_BY_BRAND } from '../shared/mock/products'

// Простой PrismaClient без адаптера
const prisma = new PrismaClient()

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
