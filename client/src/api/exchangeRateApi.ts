import { ExchangeRateData } from '@/types/exchangeRates.types';
import api from './api';

const URLS = {
  exRateUrl: 'exchange-rates',
  exRateDatesUrl: 'exchange-rates/dates',
};

export const fetchExchangeDataList = async () => {
  return api.get<ExchangeRateData[]>(URLS.exRateUrl).then((res) => res.data);
  //.then((data) => {
  //let arr: string[] = [];
  //data.map((item) => arr.push(item.date));
  //return arr;
  //});
};

export const fetchExchangeDataDates = async () => {
  return api.get<string[]>(URLS.exRateDatesUrl).then((res) => res.data);
};

export const fetchExchangeDataItem = async (
  date: string | null | undefined
) => {
  return api
    .get<ExchangeRateData>(`${URLS.exRateUrl}/${date}`)
    .then((res) => res.data);
};
