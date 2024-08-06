import { CurrencyRate } from '@/types/exchangeRates.types';
import React from 'react';

export const useSortableTable = (
  data: CurrencyRate[],
  setExchangeData: React.Dispatch<React.SetStateAction<CurrencyRate[]>>
) => {
  //const [tableData, setTableData] = useState(data);
  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        //TODO if time
        const aValue = a[sortField];
        const bValue = b[sortField];

        // Check if both values are null
        if (aValue === null && bValue === null) return 0;

        // Handle null values
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        // Check if both values are numbers
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * (sortOrder === 'asc' ? 1 : -1);
        }

        // If not numbers, compare them as strings
        return (
          aValue.toString().localeCompare(bValue.toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });

      setExchangeData(sorted);
    }
  };

  return { handleSorting };
};
