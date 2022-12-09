import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

import './ItemInput.css';

import { IDataItems } from '../../types/app-types';

interface IProps {
  id: number;
  setItemNumber: React.Dispatch<React.SetStateAction<Array<number>>>;
  setItemList: React.Dispatch<React.SetStateAction<IDataItems[]>>;
}

export const ItemInput = ({ id, setItemList, setItemNumber }: IProps) => {
  const [itemName, setItemName] = useState('');

  const handleClickRemove = () => {
    if (!itemName) {
      setItemNumber(listNumbers => {
        return listNumbers.filter(number => number !== id);
      });

      return;
    }

    setItemNumber(listNumbers => {
      return listNumbers.filter(number => number !== id);
    });
    setItemList(prev => {
      return prev.filter(list => list.id !== id);
    });
  };

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
    setItemList(prev => {
      const itemFound = prev.findIndex(item => item.id === id);
      if (itemFound === -1) return [...prev, { id, item_name: e.target.value }];

      prev[itemFound].item_name = e.target.value;
      return prev;
    });
  };

  return (
    <div className="formControl__createEvent">
      <div className="flex items-center inputItem__container">
        <div className="flex-1">
          <input
            type="text"
            className="formInput__event focus:ring-0 itemInput"
            id="itemNumber"
            placeholder=" "
            value={itemName}
            onChange={e => handleChangeItem(e)}
          />
          <label className="formControl__labelEvent" htmlFor="itemNumber">
            New Item
          </label>
        </div>
        {id !== 1 ? (
          <button className="text-red-600 pr-3" type="button" onClick={handleClickRemove}>
            <RxCross2 />
          </button>
        ) : null}
      </div>
    </div>
  );
};
