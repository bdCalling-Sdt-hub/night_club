export const formatCurrency = (
  value: number,
  currencyCode = 'USD',
  locale = 'en-US',
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
};
