import { env } from '../helpers/env';
import { IEventsData, IEvents } from '../types/app-types';

export const createNewEvent = async (data: IEventsData) => {
  try {
    if (data) {
      const fd = new FormData();
      for (const name in data) {
        fd.append(name, data[name as keyof IEventsData]);
      }

      const response = await fetch(`${env.baseUrl}/api/events`, {
        method: 'POST',
        mode: 'cors',
        body: fd,
      });

      const result = (await response.json()) as IEvents;
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
