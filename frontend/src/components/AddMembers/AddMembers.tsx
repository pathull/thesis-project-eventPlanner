import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

import { IOptionsForMembers } from '../../types/app-types';
import { UserContext } from '../../context/UserContext';
import { CurrentEventContext } from '../../context/CurrentEventContext';
import { useUserList } from '../../hooks/useUserList';
import { addMembersToEvent } from '../../services/fetch-events';
import { Spinner } from '../Spinner/Spinner';

const animatedComponent = makeAnimated();

export const AddMembers = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const eventCtx = useContext(CurrentEventContext);
  const [lists, status] = useUserList(userCtx && userCtx.userInfo?.id ? userCtx.userInfo.id : 0);
  const [allMembers, setAllMembers] = useState<MultiValue<IOptionsForMembers[]>>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (userCtx?.userInfo?.id && eventCtx?.eventData?.id) {
      if (allMembers.length > 0) {
        const info = {
          members: allMembers,
        };

        const res = await addMembersToEvent(userCtx.userInfo.id, eventCtx.eventData.id, info);

        if (res && res.length > 0) {
          setLoading(false);
          navigate('/add-items');
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
      <div className="containerSpinner">
        <div className="loadingContainer">
          <Spinner />
          <h1 className="text-2xl font-semibold mt-4">Adding members, please wait...</h1>
        </div>
      </div>
    );
  }

  return (
    <section className="createEventContainer">
      <h1 className="createEventTitle">Step 2 - Add Members to the Event</h1>
      <div className="createEventCard">
        <form className="formContainer__createEvent" onSubmit={e => void handleSubmit(e)}>
          <div className="formControl__createEvent">
            <Select
              isMulti
              isClearable={true}
              options={lists}
              isSearchable={true}
              onChange={item => setAllMembers(item as unknown as MultiValue<IOptionsForMembers[]>)}
              isDisabled={false}
              isLoading={status === 'loaded' ? false : true}
              closeMenuOnSelect={false}
              components={animatedComponent}
            />
          </div>
          <div className="formContainer__btn">
            <button type="submit" className="submitButton__newEvent">
              Add Members
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
