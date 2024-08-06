import { CurrencyRate } from '@/types/exchangeRates.types';
import * as React from 'react';

export const findHighestValue = (
  data: CurrencyRate[],
  setHighestValue: React.Dispatch<React.SetStateAction<string | null>>
) => {
  let maxValue = Number.MIN_VALUE;
  let highestResult: string | null = null;

  data.forEach((item) => {
    if (item.percentChange > maxValue) {
      maxValue = item.percentChange;
      highestResult = item.name;
    }
  });

  setHighestValue(highestResult);
};
