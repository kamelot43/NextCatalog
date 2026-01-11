import { notFound } from 'next/navigation';
import { Providers } from '@/shared/store/provider';
import { Header } from '@/ui/layout/Header/Header';
import { isBrand } from '@/shared/config/brands';

export default async function BrandLayout({
  children,
  params,
}: {
    children: React.ReactNode;
    params: Promise<{ brand: string }>;
}) {
    const { brand } = await params;

    if (!isBrand(brand)) {
        notFound();
    }

    return (
        <div data-brand={brand}>
            <Providers>
                <Header brand={brand} />
                <main style={{ padding: '24px' }}>{children}</main>
            </Providers>
        </div>
    );
}
