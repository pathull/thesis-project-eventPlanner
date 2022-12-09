import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { RiErrorWarningFill } from 'react-icons/ri';

import './AddMembers.css';

import { IOptionsForMembers } from '../../types/app-types';
import { errorToast, showToast } from '../../helpers/toasts';
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

    if (userCtx?.userInfo?.id && eventCtx?.eventData?.id) {
      if (allMembers.length > 0) {
        setLoading(true);

        const info = {
          members: allMembers,
        };

        const res = await addMembersToEvent(userCtx.userInfo.id, eventCtx.eventData.id, info);

        if (res && res.length > 0) {
          setLoading(false);
          navigate('/add-items');
          return;
        }

        setLoading(false);
        errorToast('Error adding members, please wait you will be redirected');
        navigate('/');
        return;
      }

      showToast('Need to add members before submit');
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
          <h1 className="text-2xl font-semibold mt-4">Adding members, please wait...</h1>
        </div>
      </div>
    );
  }

  return (
    <section className="createEventContainer">
      <h1 className="createEventTitle">Step 2 - Add Members to the Event</h1>
      <div className="createEventCard">
        <div className="skippingLink">
          <Link to="/add-items">Skip step, add members later!</Link>
        </div>
        <form className="formContainer__createEvent marginMember" onSubmit={e => void handleSubmit(e)}>
          <div className="formControl__createEvent pt-4">
            <Select
              isMulti
              isClearable={true}
              options={lists}
              isSearchable={true}
              onChange={item => setAllMembers(item as unknown as MultiValue<IOptionsForMembers[]>)}
              isDisabled={false}
              isLoading={status === 'loading' ? true : false}
              closeMenuOnSelect={false}
              components={animatedComponent}
            />

            <div className={`warningText__members ${lists.length > 0 ? 'activeMemberList' : ''}`}>
              <RiErrorWarningFill />
              <p>No members at the moment, you can invite them later</p>
            </div>
          </div>
          <div className="formContainer__btn">
            <button
              type="submit"
              className={`submitButton__newEvent ${lists.length < 1 ? 'cursor-not-allowed' : ''}`}
              disabled={lists.length < 1}
            >
              Add Members
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
