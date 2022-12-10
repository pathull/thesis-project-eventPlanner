import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdOutlineNoteAdd } from 'react-icons/md';

import './SingleEvent.css';

import { CurrentEventContext } from '../../context/CurrentEventContext';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import { MemberCard } from '../../components/MemberCard/MemberCard';
import { CreatorCard } from '../../components/CreatorCard/CreatorCard';
import { ItemCard } from '../../components/ItemCard/ItemCard';
import { Watch } from '../Watch/Watch';
import { getSingleEventInfo } from '../../services/fetch-events';
import { showToast } from '../../helpers/toasts';
import { ISingleEvent } from '../../types/app-types';

export const SingleEvent = (): JSX.Element => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const userCtx = useContext(UserContext);
  const eventCtx = useContext(CurrentEventContext);
  const socketCtx = useContext(SocketContext);
  const [event, setEvent] = useState<ISingleEvent | null>(null);

  useEffect(() => {
    if (eventId) {
      void getSingleEventInfo(eventId).then(data => {
        if (data && data.id) {
          eventCtx?.updateCurrentEvent(data);
          setEvent(data);
        }
      });
    }
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToChat = () => {
    if (userCtx?.userInfo?.id && event?.members && event.members.length > 0) {
      const isMember = event.members.map(member => member.user_id).includes(userCtx.userInfo.id);

      if (isMember || event.createdBy === userCtx.userInfo.id) {
        if (eventCtx?.eventData?.id) {
          socketCtx?.socket?.emit('join_room', {
            userId: userCtx.userInfo.id,
            eventId: eventCtx.eventData.id,
            roomId: `${eventCtx.eventData.eventName}-${eventCtx.eventData.id}`,
          });

          navigate('/chat');
          return;
        }
      }

      showToast('You are not part of this event, please join in!');
    }
  };

  if (!event) {
    return (
      <div>
        <h1>Event does not exist</h1>
      </div>
    );
  }

  return (
    <section>
      <div className="singleEvent__banner" style={{ backgroundImage: `url(${event.picUrl})` }}>
        <div className="singleEvent__overlay">
          <h1 className="singleEvent__mainTitle">{event.eventName}</h1>
          <div className="singleEvent__info">
            <div className="singleEvent__timerContainer">
              <p>members: {event.members.length}</p>
              <Watch time={event.eventDate} />
            </div>
            <div className="chatLink__container">
              <button className="linkToChat" onClick={goToChat}>
                Join Chat
              </button>
            </div>
          </div>
        </div>
        <div className="singleEvent__details">
          <h2>Details</h2>
          <p>{event.description}</p>
        </div>
        <div className="singleEvent__members">
          <div className="singleEventMembers__headline">
            <h2>Attendees ({event.members.length + 1})</h2>
            <Link to="/add-members" title="Add members">
              <AiOutlineUsergroupAdd className="addNewMember__icon" />
            </Link>
          </div>
          <div className="membersList__container">
            <CreatorCard creator={event.user} />
            {event.members.length > 0 ? (
              <>
                {event.members.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </>
            ) : null}
          </div>
        </div>
        <div className="singleEvent__members">
          <div className="singleEventMembers__headline">
            <h2>Items ({event.items.length})</h2>
            <Link to="/add-items" title="Add items">
              <MdOutlineNoteAdd className="addNewMember__icon" />
            </Link>
          </div>
          {event.items.length > 0 ? (
            <div className="membersList__container">
              {event.items.map(item => (
                <ItemCard key={item.id} item={item} event={event} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center my-4">
              <p className="text-2xl font-bold text-[#808080]">No items for the Event</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
