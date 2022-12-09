import { useState, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { CurrentEventContext } from '../../context/CurrentEventContext';
import { errorToast, showToast } from '../../helpers/toasts';
import { ItemInput } from '../ItemInput/ItemInput';
import { addItemsToEvent } from '../../services/fetch-events';
import { IDataItems } from '../../types/app-types';
import { Spinner } from '../Spinner/Spinner';

export const AddListItems = () => {
  const navigate = useNavigate();
  const eventCtx = useContext(CurrentEventContext);
  const [itemNumber, setItemNumber] = useState([1]);
  const [itemList, setItemList] = useState<Array<IDataItems>>([]);
  const [loading, setLoading] = useState(false);
  const countRef = useRef(1);

  const handleCounter = () => {
    countRef.current++;
    setItemNumber(list => [...list, countRef.current]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(itemList);

    if (eventCtx?.eventData?.id) {
      if (Array.isArray(itemList) && itemList.length > 0) {
        setLoading(true);
        const data = {
          items: itemList,
        };

        const result = await addItemsToEvent(eventCtx.eventData.id, data);

        if (Array.isArray(result) && result.length > 0) {
          setLoading(false);
          navigate('/');
          return;
        }

        setLoading(false);
        errorToast('Error adding your list of items, you will be redirected');
        navigate('/');
        return;
      }

      showToast('Need to add at least one item');
      return;
    }

    errorToast('Event must be created first');
    navigate('/create-event');
  };

  if (loading) {
    return (
      <div className="containerSpinner">
        <div className="loadingContainer">
          <Spinner />
          <h1 className="text-2xl font-semibold mt-4">Adding items, please wait...</h1>
        </div>
      </div>
    );
  }

  return (
    <section className="createEventContainer">
      <h1 className="createEventTitle">Step 3, Add items to the event</h1>

      <div className="createEventCard">
        <div className="skippingLink">
          <Link to="/">Skip step, add items later!</Link>
        </div>
        <button type="button" className="text-[#008294]" onClick={handleCounter}>
          Add new item
        </button>
        <form className="formContainer__createEvent mt-5" onSubmit={e => void handleSubmit(e)}>
          {itemNumber.map(el => (
            <ItemInput key={el} id={el} setItemList={setItemList} setItemNumber={setItemNumber} />
          ))}
          <div className="formContainer__btn">
            <button
              type="submit"
              className={`submitButton__newEvent ${itemList.length < 1 ? 'cursor-not-allowed' : ''}`}
              disabled={itemList.length < 1}
            >
              Add items
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
