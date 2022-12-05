import { useEffect, useContext, useState } from 'react';

import './MessageList.css';

import { MessageCard } from '../MessageCard/MessageCard';
import { IMessages } from '../../types/app-types';
import { SocketContext } from '../../context/SocketContext';
import { scrollToBottomAnimated } from '../../helpers/app-functions';

export const MessageList = (): JSX.Element => {
  const socketCtx = useContext(SocketContext);
  const [listMessages, setListMessages] = useState<Array<IMessages>>([]);

  useEffect(() => {
    const getListMsgs = (data: IMessages[]) => {
      if (data) {
        setListMessages(data);
        scrollToBottomAnimated('chatMsgs');
      }
    };

    socketCtx?.socket?.on('server:all-chats', getListMsgs);

    return () => {
      socketCtx?.socket?.off('server:all-chats', getListMsgs);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const receiveNewMsg = (data: IMessages) => {
      if (data) {
        console.log(data);
        setListMessages(msgs => [...msgs, data]);
      }
    };

    socketCtx?.socket?.on('server:messageChat', receiveNewMsg);

    return () => {
      socketCtx?.socket?.off('server:messageChat', receiveNewMsg);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // <div className="chatList__container">
    <>{listMessages.length > 0 ? listMessages.map(msg => <MessageCard key={msg.id} msg={msg} />) : null}</>
    // </div>
  );
};
