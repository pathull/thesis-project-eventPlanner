import Scroll from 'react-scroll';
import { DateTime } from 'luxon';
import moment from 'moment';

export const scrollToBottom = (id: string) => {
  Scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};

export const scrollToBottomAnimated = (id: string) => {
  Scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 250,
  });
};

//? Date formatting
export const fullTimeDate = (date: string) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);

export const getHourDate = (date: string) => DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);

export const relativeTime = (date: string) => moment(date).endOf('day').fromNow();

//? Add 2 hours to get end date by default
