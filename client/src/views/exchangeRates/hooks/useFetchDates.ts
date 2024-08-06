import { fetchExchangeDataDates } from '@/api/exchangeRateApi';
import { useEffect, useState } from 'react';

export const useFetchDates = () => {
  const [dates, setDates] = useState<string[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const initFetchDates = async () => {
    const response = await fetchExchangeDataDates();
    setDates(response);
    // set the default date to the last available date
    setSelectedDate(response[response.length - 1]);
  };

  useEffect(() => {
    initFetchDates();
  }, []);

  return { dates, selectedDate, setSelectedDate, initFetchDates };
};
