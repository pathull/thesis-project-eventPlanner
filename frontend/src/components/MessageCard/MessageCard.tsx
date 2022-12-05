import { useContext } from 'react';
import { DateTime } from 'luxon';

import './MessageCard.css';

import { UserContext } from '../../context/UserContext';
import { IMessages } from '../../types/app-types';

export const MessageCard = ({ msg }: { msg: IMessages }) => {
  const userCtx = useContext(UserContext);

  return (
    <>
      {msg.user && userCtx?.userInfo ? (
        <div className={`${userCtx.userInfo.id === msg.user.id ? 'messageContainer__positioning' : ''}`}>
          <div className="messageInfo__container">
            {userCtx.userInfo.id !== msg.user.id ? (
              <img className="imageMessage__chat" src={msg.user.picUrl} alt={msg.user.name} />
            ) : null}
            <div className="messageDetails__chat">
              <div className={`chatDetails__msg ${userCtx.userInfo.id === msg.user.id ? 'myMessages__container' : ''}`}>
                <p>{msg.message}</p>
              </div>
              <div className={`timesTamp__chatInfo ${userCtx.userInfo.id === msg.user.id ? 'myTimesTamp__chat' : ''}`}>
                <span>
                  {msg.user.name} {msg.user.lastName ? msg.user.lastName : null}
                </span>
                <span>{DateTime.fromISO(msg.createdAt).toLocaleString(DateTime.TIME_SIMPLE)}</span>
              </div>
            </div>
            {userCtx.userInfo.id === msg.user.id ? (
              <img className="imageMessage__chat" src={msg.user.picUrl} alt={msg.user.name} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
