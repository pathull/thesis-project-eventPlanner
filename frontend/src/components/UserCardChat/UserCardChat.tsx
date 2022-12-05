import { LazyLoadImage } from 'react-lazy-load-image-component';

import './UserCardChat.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { IUserAPI } from '../../types/app-types';
import { env } from '../../helpers/env';

export const UserCardChat = ({ user }: { user: IUserAPI }): JSX.Element => {
  return (
    <div className="userCardChat__container">
      <LazyLoadImage
        effect="blur"
        width={45}
        placeholderSrc={env.userImgPlaceholder}
        height={45}
        loading="lazy"
        src={user.picUrl}
        alt={user.name}
        className="userCardChat__container--image"
      />
      <div className="userChat__info">
        <p>
          {user.name} {user.lastName ? user.lastName : null}
        </p>
        <p>{user.username ? user.username : null}</p>
      </div>
    </div>
  );
};
