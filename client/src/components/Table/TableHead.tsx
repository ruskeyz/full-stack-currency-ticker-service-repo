import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export type TableHeadProps = {
  columns: {
    label: string;
    accessor: string;
  }[];
  handleSorting: (accessor: string, sortOrder: string) => void;
};

export default function TableHead({ columns, handleSorting }: TableHeadProps) {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.accessor}
            scope='col'
            onClick={() => handleSortingChange(column.accessor)}
            className='py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900'
          >
            <a href='#' className='group inline-flex'>
              {column.label}
              <span className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'>
                {sortField === column.accessor && order === 'asc' ? (
                  <ChevronUpIcon className='h-5 w-5' aria-hidden='true' />
                ) : (
                  <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
                )}
              </span>
            </a>
          </th>
        ))}
      </tr>
    </thead>
  );
}
