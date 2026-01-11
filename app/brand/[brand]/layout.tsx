import {notFound} from 'next/navigation';
import {Providers} from '@/shared/store/provider';
import {Header} from '@/ui/layout/Header/Header';
import {isBrand} from '@/shared/config/brands';
import type {Metadata} from 'next';

export async function generateMetadata({
   params,
}: {
    params: Promise<{ brand: string }>;
}): Promise<Metadata> {
    const {brand} = await params;

    if (!isBrand(brand)) {
        notFound();
    }

    const brandTitle = brand === 'alpha' ? 'Alpha' : brand === 'beta' ? 'Beta' : brand;

    return {
        title: `${brandTitle} — NextCatalog`,
        description: `Каталог автомобилей бренда ${brandTitle}. Сравнение, избранное, фильтры.`,
    };
}

export default async function BrandLayout({
  children,
  params,
}: {
    children: React.ReactNode;
    params: Promise<{ brand: string }>;
}) {
    const {brand} = await params;

    if (!isBrand(brand)) {
        notFound();
    }

    return (
        <div data-brand={brand}>
            <Providers>
                <Header brand={brand}/>
                <main style={{padding: '24px'}}>{children}</main>
            </Providers>
        </div>
    );
}
