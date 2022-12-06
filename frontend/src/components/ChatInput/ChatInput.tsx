import { useState, useContext } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

import './ChatInput.css';

import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';
import { CurrentEventContext } from '../../context/CurrentEventContext';
import { IErrorSockets } from '../../types/app-types';

export const ChatInput = () => {
  const userCtx = useContext(UserContext);
  const socketCtx = useContext(SocketContext);
  const eventCtx = useContext(CurrentEventContext);
  const [message, setMessage] = useState('');

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userCtx?.userInfo && eventCtx?.eventData && socketCtx?.socket) {
      if (message !== '') {
        const messageData = {
          event_id: eventCtx.eventData.id,
          user_id: userCtx.userInfo.id,
          roomChatId: `${eventCtx.eventData.eventName}-${eventCtx.eventData.id}`,
          message,
        };

        socketCtx.socket.emit('client:newIncomingMessage', messageData, (err: IErrorSockets) => {
          if (err) alert(`Error ${err.message}`); //FIXME: change the alert
        });
        setMessage('');
      }

      //TODO: Make error for empty messages
    }

    //TODO: Make error handling
  };

  return (
    <div className="messageContainer__input">
      <form onSubmit={handleMessageSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="inputChat__message focus:ring-0"
            placeholder="Type your message..."
            name="message"
          />
          <button type="submit" className="m-3 text-2xl">
            <FaTelegramPlane className="text-[#71757d] hover:text-[#005cf5]" />
          </button>
        </div>
      </form>
    </div>
  );
};
