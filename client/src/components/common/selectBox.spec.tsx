import { render, fireEvent, screen } from '@/helpers/test-utils';
import SelectBox from './SelectBox';
import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, it } from 'vitest';

const selectBoxData: string[] = ['a', 'b', 'c'];

const renderSelectBox = () => {
  const { result } = renderHook(() => {
    const [selectedOption, setSelectedOption] = useState<string | null>(
      selectBoxData[selectBoxData.length - 1]
    );

    return { selectedOption, setSelectedOption };
  });
  render(
    <SelectBox
      data={selectBoxData}
      option={result.current.selectedOption}
      setOption={result.current.setSelectedOption}
    />
  );
};

describe('SelectBox.tsx', () => {
  it('Select Box should have the default selected data', async () => {
    renderSelectBox();
    screen.getByText(selectBoxData[selectBoxData.length - 1]);
  });
  it('Calling setOption should select different data', async () => {
    renderSelectBox();
    fireEvent.click(screen.getByRole('button', { name: /c/i }));
    selectBoxData.forEach((data) => {
      screen.getByRole('option', { name: data });
    });
  });
});
