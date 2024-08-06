import { CurrencyRate } from '@/types/exchangeRates.types';
import * as React from 'react';

export const findLowestValue = (
  data: CurrencyRate[],
  setLowestValue: React.Dispatch<React.SetStateAction<string | null>>
) => {
  let minValue = Number.MAX_VALUE;
  let lowestResult: string | null = null;

  data.forEach((item) => {
    if (item.percentChange < minValue) {
      minValue = item.percentChange;
      lowestResult = item.name;
    }
  });

  setLowestValue(lowestResult);
};
