import React, { useState } from 'react';

import './ItemInput.css';

import { IDataItems } from '../../types/app-types';

interface IProps {
  id: number;
  setItemList: React.Dispatch<React.SetStateAction<IDataItems[]>>;
}

export const ItemInput = ({ id, setItemList }: IProps) => {
  const [itemName, setItemName] = useState('');
  const [state, setState] = useState(false);

  const handleSave = () => {
    setState(!state);

    setItemList(list => [...list, { item_name: itemName }]);
  };

  return (
    <div className="formControl__createEvent">
      <div className="flex items-center inputItem__container">
        <div className="flex-1">
          <input
            disabled={state}
            type="text"
            className="formInput__event focus:ring-0 itemInput"
            id="itemNumber"
            placeholder=" "
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
          <label className="formControl__labelEvent" htmlFor="itemNumber">
            Item #{id}
          </label>
        </div>
        <button
          className={`text-dark-blue pr-3 ${state || (itemName === '' && true) ? 'cursor-no-drop' : ''}`}
          disabled={state || (itemName === '' && true)}
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};
