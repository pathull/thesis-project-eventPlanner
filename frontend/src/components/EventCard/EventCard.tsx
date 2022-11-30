import { Link } from 'react-router-dom';
import moment from 'moment';

import './EventCard.css';

import { IEvents } from '../../types/app-types';

interface IProps {
  event: IEvents;
}

export const EventCard = ({ event }: IProps) => {
  return (
    <div className="eventCard__container">
      <Link to={`/single-event/${event.id}`}>
        <div className="eventCard__bodyInfo">
          <img alt={event.eventName} src={event.picUrl} className="eventCard__image" />
          <div className="eventCard__textContainer">
            <h2 className="eventCardText__title">{event.eventName}</h2>
            <p className="eventCardText__date">{moment(event.eventDate).format('LL')}</p>
            <p className="eventCardText__time">{moment(event.eventDate).format('LT')}</p>
            <p className="eventCardText__countdown">Starts {moment(event.eventDate).endOf('day').fromNow()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
