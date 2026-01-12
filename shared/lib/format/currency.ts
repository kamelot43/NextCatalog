export type Currency = 'RUB' | 'USD' | 'EUR';

// Фиксированные курсы (условные)
export const EXCHANGE_RATES: Record<Currency, number> = {
    RUB: 1,
    USD: 90,
    EUR: 100
};

export function convertFromRub(
    priceRub: number,
    targetCurrency: Currency
): number {
    const rate = EXCHANGE_RATES[targetCurrency];
    return Math.round(priceRub / rate);
}
