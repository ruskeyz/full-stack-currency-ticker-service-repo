import { fetchExchangeDataItem } from '@/api/exchangeRateApi';
import SelectBox from '@/components/common/SelectBox';
import Table from '@/components/Table/Table';
import { CurrencyRate } from '@/types/exchangeRates.types';
import { useEffect, useState } from 'react';
import { useFetchDates } from './hooks/useFetchDates';
import { useSortableTable } from './hooks/useSortableTable';

const columns = [
  { label: 'Name', accessor: 'name' },
  { label: 'Rate', accessor: 'price' },
  { label: '% Change', accessor: 'percentChange' },
];

export default function ExchangeRates() {
  const { dates, selectedDate, setSelectedDate } = useFetchDates();

  const [exchangeData, setExchangeData] = useState<CurrencyRate[]>([]);

  const { handleSorting } = useSortableTable(exchangeData, setExchangeData);

  useEffect(() => {
    if (selectedDate) {
      fetchExchangeDataItem(selectedDate).then((res) =>
        setExchangeData(res.rates)
      );
    }
  }, [selectedDate]);

  return (
    <div className='py-8 px-4 flex flex-col items-center justify-center'>
      <h1 className='font-bold text-5xl'>Currency Ticker App</h1>
      <div className='mt-4'>
        {dates ? (
          <SelectBox
            data={dates}
            option={selectedDate}
            setOption={setSelectedDate}
            label='Select day from available data'
          />
        ) : null}
      </div>
      {exchangeData ? (
        <Table
          data={exchangeData}
          columns={columns}
          handleSorting={handleSorting}
          tableCaption='Exchange Rate Table'
        />
      ) : null}
    </div>
  );
}
