import type { Currency } from './currency';
import { convertFromRub } from './currency';

export function formatPrice({
    priceRub,
    currency,
    locale,
}: {
    priceRub: number;
    currency: Currency;
    locale: string;
}) {
    const value =
        currency === 'RUB'
            ? priceRub
            : convertFromRub(priceRub, currency);

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}
