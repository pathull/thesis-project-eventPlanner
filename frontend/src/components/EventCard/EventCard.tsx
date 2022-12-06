import { Link } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './EventCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { env } from '../../helpers/env';
import { IEvents } from '../../types/app-types';

interface IProps {
  event: IEvents;
}

export const EventCard = ({ event }: IProps) => {
  return (
    <div className="eventCard__container" data-testid="eventCardsArray">
      <Link to={`/single-event/${event.id}`}>
        <div className="eventCard__bodyInfo">
          <LazyLoadImage
            loading="lazy"
            effect="blur"
            alt={event.eventName}
            src={event.picUrl}
            height={192}
            width={240}
            className="eventCard__image"
            placeholderSrc={env.eventImgPlaceholder}
          />
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
