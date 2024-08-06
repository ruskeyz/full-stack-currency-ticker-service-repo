import classNames from '@/helpers/classNames';
import { CurrencyRate } from '@/types/exchangeRates.types';

export type TableBodyProps = {
  columns: {
    accessor: string;
    label: string;
  }[];
  data: CurrencyRate[];
  lowestValue?: string | null;
  highestValue?: string | null;
};

export default function TableBody({
  columns,
  data,
  lowestValue,
  highestValue,
}: TableBodyProps) {
  return (
    <tbody className='divide-y divide-gray-200 bg-white'>
      {data.map((rate) => (
        <tr
          key={rate.name}
          className={classNames(
            rate.name === highestValue && rate.percentChange !== 0
              ? 'bg-green-200'
              : rate.name === lowestValue && rate.percentChange !== 0
              ? 'bg-red-200'
              : ''
          )}
        >
          {columns.map(({ accessor }) => {
            if (
              accessor != 'name' &&
              accessor != 'price' &&
              accessor != 'percentChange'
            ) {
              return;
            }
            const tData = rate[accessor] ? rate[accessor] : '0';
            return (
              <td
                className='whitespace-nowrap py-4 pl-2 pr-3 text-sm font-medium text-gray-900'
                key={accessor}
              >
                {rate[accessor] === rate.percentChange ? tData + ' %' : tData}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
