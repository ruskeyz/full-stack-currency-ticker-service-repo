import { CurrencyRate } from '@/types/exchangeRates.types';
import { useEffect, useState } from 'react';
import { findHighestValue } from '@/views/exchangeRates/helpers/findHighestValue';
import { findLowestValue } from '@/views/exchangeRates/helpers/findLowestValue';
import TableBody from './TableBody';
import TableHead from './TableHead';

export type TableProps = {
  data: CurrencyRate[];
  columns: {
    label: string;
    accessor: string;
  }[];
  handleSorting: (sortField: string, sortOrder: string) => void;
  tableCaption?: string;
};

export default function Table({
  data,
  columns,
  handleSorting,
  tableCaption,
}: TableProps) {
  const [highestValue, setHighestValue] = useState<string | null>(null);
  const [lowestValue, setLowestValue] = useState<string | null>(null);

  useEffect(() => {
    findHighestValue(data, setHighestValue);
    findLowestValue(data, setLowestValue);
  }, [data]);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              {tableCaption ? (
                <caption className='caption-bottom text-sm text-gray-300'>
                  {tableCaption}
                </caption>
              ) : null}
              <TableHead columns={columns} handleSorting={handleSorting} />
              <TableBody
                columns={columns}
                data={data}
                lowestValue={lowestValue}
                highestValue={highestValue}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
