'use client';

import { usePreferences } from '@/shared/context/PreferencesContext';
import { formatPrice } from '@/shared/lib/format/formatPrice';

export function PriceText({ priceRub }: { priceRub: number }) {
    const prefs = usePreferences();

    return (
        <>
            {formatPrice({
                priceRub,
                currency: prefs.currency,
                locale: prefs.locale,
            })}
        </>
    );
}
