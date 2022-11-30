import { env } from '../helpers/env';
import { IEventsData, IEvents, IDataMembers, IMembersAPI, IDataItems, IListItems } from '../types/app-types';

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

export const addMembersToEvent = async (userId: number, eventId: number, data: IDataMembers) => {
  try {
    if (data.members.length > 0) {
      const res = await fetch(`${env.baseUrl}/api/events/add-member/${userId}/event/${eventId}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const allMembers = (await res.json()) as unknown as IMembersAPI[];
      return allMembers;
    }
  } catch (err) {
    console.error(err);
  }
};

export const addItemsToEvent = async (eventId: number, data: { items: Array<IDataItems> }) => {
  try {
    if (Array.isArray(data.items) && data.items.length > 0) {
      const res = await fetch(`${env.baseUrl}/api/events/add-items/${eventId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const itemsList = (await res.json()) as unknown as Array<IListItems>;
      return itemsList;
    }
  } catch (err) {
    console.error(err);
  }
};
