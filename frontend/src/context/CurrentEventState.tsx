import { useState } from 'react';

import { CurrentEventContext } from './CurrentEventContext';
import { IEvents } from '../types/app-types';

export const CurrentEventState = ({ children }: { children: JSX.Element }) => {
  const [eventData, setEventData] = useState<IEvents | null>(null);

  const updateCurrentEvent = (data: IEvents) => {
    if (data) setEventData(data);
  };

  return (
    <CurrentEventContext.Provider value={{ eventData, updateCurrentEvent }}>{children}</CurrentEventContext.Provider>
  );
};
