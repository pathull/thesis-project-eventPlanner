import { useContext } from 'react';

import './Chat.css';

import { CurrentEventContext } from '../../context/CurrentEventContext';
import { ChatMembersList } from '../ChatMembersList/ChatMembersList';
import { ChatInput } from '../ChatInput/ChatInput';
import { MessageList } from '../MessagesList/MessageList';

export const Chat = () => {
  const eventCtx = useContext(CurrentEventContext);

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
          <img
            loading="lazy"
            className="memberContainer__topChat--image"
            src={eventCtx.eventData.picUrl}
            alt={eventCtx.eventData.eventName}
          />
          <h2>Welcome to {eventCtx.eventData.eventName} Chatbox</h2>
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
        <div id="chatMsgs" className="messagesContainer__chats">
          <MessageList />
        </div>
        <ChatInput />
      </div>
    </section>
  );
};
