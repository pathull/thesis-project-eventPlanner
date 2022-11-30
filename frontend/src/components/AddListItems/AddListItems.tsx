import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CurrentEventContext } from '../../context/CurrentEventContext';
import { ItemInput } from '../ItemInput/ItemInput';
import { addItemsToEvent } from '../../services/fetch-events';
import { IDataItems } from '../../types/app-types';

let counter = 1;

export const AddListItems = () => {
  const navigate = useNavigate();
  const eventCtx = useContext(CurrentEventContext);
  const [itemNumber, setItemNumber] = useState<Array<number>>([1]);
  const [itemList, setItemList] = useState<Array<IDataItems>>([]);
  const [loading, setLoading] = useState(false);

  const handleCounter = () => {
    counter = counter + 1;
    setItemNumber(list => [...list, counter]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (eventCtx?.eventData?.id) {
      if (Array.isArray(itemList) && itemList.length > 0) {
        const data = {
          items: itemList,
        };

        const result = await addItemsToEvent(eventCtx.eventData.id, data);

        if (Array.isArray(result) && result.length > 0) {
          setLoading(false);
          navigate('/');
        } else {
          setLoading(false);
          alert('Possible Error'); //TODO change the alert using sweet alert
          navigate('/');
        }
      }
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Adding Items, please wait...</h1>
      </div>
    );
  }

  return (
    <section className="createEventContainer">
      <h1 className="createEventTitle">Step 3, Add items to the event</h1>

      <div className="createEventCard">
        <button type="button" className="text-blue-700" onClick={handleCounter}>
          Add new item
        </button>
        <form className="formContainer__createEvent mt-5" onSubmit={e => void handleSubmit(e)}>
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
