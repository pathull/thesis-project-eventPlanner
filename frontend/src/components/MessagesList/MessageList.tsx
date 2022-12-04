import { useState, useEffect, useContext } from 'react';

import { MessageCard } from '../MessageCard/MessageCard';
import { IMessages } from '../../types/app-types';
import { SocketContext } from '../../context/SocketContext';

export const MessageList = (): JSX.Element => {
  const socketCtx = useContext(SocketContext);
  const [listMessages, setListMessages] = useState<Array<IMessages>>([]);

  useEffect(() => {
    console.log('how much messy');
    if (socketCtx?.socket) {
      socketCtx.socket.on('server:messageChat', (data: IMessages) => {
        if (data) setListMessages(msgs => [...msgs, data]);
      });
    }
  }, [socketCtx?.socket]);

  console.log(listMessages);

  return (
    <>
      <MessageCard />
      <MessageCard />
    </>
  );
};
