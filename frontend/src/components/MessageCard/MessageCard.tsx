import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './MessageCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { UserContext } from '../../context/UserContext';
import { getHourDate } from '../../helpers/app-functions';
import { IMessages } from '../../types/app-types';
import { env } from '../../helpers/env';

export const MessageCard = ({ msg }: { msg: IMessages }) => {
  const userCtx = useContext(UserContext);

  return (
    <>
      {msg.user && userCtx?.userInfo ? (
        <div
          data-testid="messageItem"
          className={`${userCtx.userInfo.id === msg.user.id ? 'messageContainer__positioning' : ''}`}
        >
          <div className="messageInfo__container">
            {userCtx.userInfo.id !== msg.user.id ? (
              <LazyLoadImage
                effect="blur"
                height={30}
                width={30}
                loading="lazy"
                className="imageMessage__chat"
                src={msg.user.picUrl}
                alt={msg.user.name}
                placeholderSrc={env.userImgPlaceholder}
              />
            ) : null}
            <div className="messageDetails__chat">
              <div className={`chatDetails__msg ${userCtx.userInfo.id === msg.user.id ? 'myMessages__container' : ''}`}>
                <p>{msg.message}</p>
              </div>
              <div className={`timesTamp__chatInfo ${userCtx.userInfo.id === msg.user.id ? 'myTimesTamp__chat' : ''}`}>
                <span>
                  {msg.user.name} {msg.user.lastName ? msg.user.lastName : null}
                </span>
                <span>{getHourDate(msg.createdAt)}</span>
              </div>
            </div>
            {userCtx.userInfo.id === msg.user.id ? (
              <LazyLoadImage
                effect="blur"
                height={30}
                width={30}
                loading="lazy"
                className="imageMessage__chat"
                src={msg.user.picUrl}
                alt={msg.user.name}
                placeholderSrc={env.userImgPlaceholder}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
