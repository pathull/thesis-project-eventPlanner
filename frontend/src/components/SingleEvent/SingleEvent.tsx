import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './SingleEvent.css';

import { getSingleEventInfo } from '../../services/fetch-events';
import { ISingleEvent } from '../../types/app-types';

export const SingleEvent = (): JSX.Element => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<ISingleEvent | null>(null);

  useEffect(() => {
    if (eventId) {
      void getSingleEventInfo(eventId).then(data => {
        if (data && data.id) {
          setEvent(data);
        }
      });
    }
  }, [eventId]);

  if (!event) {
    return (
      <div>
        <h1>Event does not exist</h1>
      </div>
    );
  }

  return (
    <section>
      <div style={{ backgroundImage: `url(${event.picUrl})` }}>
        <h1>Big event app</h1>
      </div>
    </section>
  );
};
