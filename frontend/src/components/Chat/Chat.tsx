import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Chat.css';

import { UserContext } from '../../context/UserContext';
import { CurrentEventContext } from '../../context/CurrentEventContext';
import { SocketContext } from '../../context/SocketContext';
import { ChatMembersList } from '../ChatMembersList/ChatMembersList';
import { ChatInput } from '../ChatInput/ChatInput';
import { MessageList } from '../MessagesList/MessageList';

export const Chat = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const eventCtx = useContext(CurrentEventContext);
  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    if (socketCtx?.socket && userCtx?.userInfo?.id && eventCtx?.eventData?.id) {
      socketCtx.socket.emit('join_room', {
        userId: userCtx.userInfo.id,
        eventId: eventCtx.eventData.id,
        roomId: `${eventCtx.eventData.eventName}-${eventCtx.eventData.id}`,
      });

      return;
    }

    navigate('/');
  }, [socketCtx, eventCtx, userCtx, navigate]);

  if (!eventCtx || eventCtx.eventData === null) {
    return (
      <div>
        <h1>Chat does not exist</h1>
      </div>
    );
  }

  return (
    <section className="chatContainer">
      <div className="memberContainer">
        <div className="memberContainer__topChat">
          <img src={eventCtx.eventData.picUrl} alt={eventCtx.eventData.eventName} />
          <h2> Welcome to {eventCtx.eventData.eventName} Chatbox</h2>
        </div>
        <div className="membersChat__container">
          <h3>Members:</h3>
          <ChatMembersList event={eventCtx.eventData} />
        </div>
      </div>
      <div className="messagesContainer">
        <div className="messageContainer__header">
          <div className="headerContainer__title">
            <h3>{eventCtx.eventData.eventName}</h3>
            <p>Gustavo Silva, James, Patrick</p>
          </div>
        </div>
        <div className="messagesContainer__chats">
          <MessageList />
        </div>
        <ChatInput />
      </div>
    </section>
  );
};
