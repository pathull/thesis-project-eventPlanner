import { useState } from 'react';
import Select, { MultiValue } from 'react-select';

const values = [
  { value: '1', label: 'Gustavo' },
  { value: '2', label: 'Christa' },
  { value: '3', label: 'Brooke' },
  { value: '4', label: 'John' },
];

export const Login = (): JSX.Element => {
  const [select, setSelect] = useState<MultiValue<{ value: string; label: string }>>([]);
  console.log(select);

  return (
    <div>
      <Select
        isMulti
        options={values}
        isClearable={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        onChange={item => setSelect(item)}
      />
    </div>
  );
};
