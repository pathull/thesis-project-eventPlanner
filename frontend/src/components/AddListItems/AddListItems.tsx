import { useState } from 'react';

import { ItemInput } from '../ItemInput/ItemInput';
import { IDataItems } from '../../types/app-types';

let counter = 1;

export const AddListItems = () => {
  const [itemNumber, setItemNumber] = useState<Array<number>>([1]);
  const [itemList, setItemList] = useState<Array<IDataItems>>([]);

  const handleCounter = () => {
    counter = counter + 1;
    setItemNumber(list => [...list, counter]);
  };

  console.log(itemList);

  return (
    <section className="createEventContainer">
      <h1 className="createEventTitle">Step 3, Add items to the event</h1>

      <div className="createEventCard">
        <button type="button" className="text-blue-700" onClick={handleCounter}>
          Add new item
        </button>
        <form className="formContainer__createEvent mt-5">
          {itemNumber.map(el => (
            <ItemInput key={el} id={el} setItemList={setItemList} />
          ))}
          <div className="formContainer__btn">
            <button type="submit" className="submitButton__newEvent">
              Add items
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
