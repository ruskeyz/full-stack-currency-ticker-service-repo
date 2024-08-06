export type ExchangeRateMap = Record<string, ExchangeRateData>;

export type ExchangeRateData = {
  timestamp: number;
  base: string;
  rates: Record<string, number>;
};

export type ExchangeRateList = Record<string, ExchangeRateData>;

export type CurrencyRate = {
  name: string;
  price: number;
  percentChange: number;
};

export type NewExchangeRateData = {
  date: string;
  timestamp: number;
  base: string;
  rates: CurrencyRate[];
};
