import React, { FC } from 'react';

const dictValues = {
  acoustic: 'Акустическая гитара',
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
  '4': '4',
  '6': '6',
  '7': '7',
  '12': '12',
};

type radioInputProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  name: string;
};

const RadioInput: FC<radioInputProps> = ({
  value,
  handleChange,
  checked,
  name,
}) => (
  <>
    <input
      type='radio'
      id={value}
      name={name}
      value={value}
      onChange={handleChange}
      checked={checked}
    />
    <label htmlFor={value}>
      {dictValues[value as keyof typeof dictValues]}
    </label>
  </>
);

export default RadioInput;
