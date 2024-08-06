export type CurrencyRate = {
  name: string;
  price: number;
  percentChange: number;
};

export type ExchangeRateData = {
  date: string;
  timestamp: number;
  base: string;
  rates: CurrencyRate[];
};
