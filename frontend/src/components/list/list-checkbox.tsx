import { ChangeEvent, FC } from 'react';

const dict = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
  '4': '4',
  '6': '6',
  '7': '7',
  '12': '12',
};

type ListCheckBoxProps = {
  name: string;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

const ListCheckBox: FC<ListCheckBoxProps> = ({
  name,
  handleChange,
  checked = false,
}) => (
  <div className='form-checkbox catalog-filter__block-item'>
    <input
      className='visually-hidden'
      type='checkbox'
      id={name}
      name={name}
      checked={checked}
      onChange={handleChange}
    />
    <label htmlFor={name}>{dict[name as keyof typeof dict]}</label>
  </div>
);

export default ListCheckBox;
