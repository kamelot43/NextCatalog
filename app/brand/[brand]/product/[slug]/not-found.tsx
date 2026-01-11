import Link from 'next/link';

export default function ProductNotFound() {
    return (
        <section style={{ padding: 24 }}>
            <h1 style={{ marginTop: 0 }}>Product not found</h1>
            <p>Авто с таким slug не найдено.</p>

            <Link href="../catalog">Вернуться в каталог</Link>
        </section>
    );
}
