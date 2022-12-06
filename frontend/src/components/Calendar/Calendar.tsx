import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addMinutes from 'date-fns/addMinutes';
import { retrieveAllListOfEvents } from '../../services/fetch-events';
import { CalendarEvent } from '../../types/app-types';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};
const endOfHour = (date: Date): Date => addMinutes(date, 60);
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarProfile = (): JSX.Element => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const getEvents = async () => {
    const response = await retrieveAllListOfEvents();
    const updateProp = response?.map(event => {
      return {
        title: event.eventName,
        start: new Date(event.eventDate),
        end: addMinutes(endOfHour(new Date(event.eventDate)), 120),
      };
    });
    if (updateProp) {
      setEvents(updateProp);
    }
  };

  useEffect(() => {
    void getEvents();
  }, []);

  return (
    <Calendar
      defaultView="month"
      events={events}
      localizer={localizer}
      style={{ marginTop: '2rem', height: '100vh' }}
    />
  );
};
