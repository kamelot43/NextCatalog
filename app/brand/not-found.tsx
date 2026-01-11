import Link from 'next/link';

export default function BrandNotFound() {
    return (
        <section style={{ padding: 24 }}>
            <h1 style={{ marginTop: 0 }}>Brand not found</h1>
            <p>Такого бренда нет. Доступны: alpha / beta.</p>

            <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/brand/alpha/catalog">Перейти в Alpha</Link>
                <Link href="/brand/beta/catalog">Перейти в Beta</Link>
            </div>
        </section>
    );
}
