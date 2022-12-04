import './UserCardChat.css';

import { IUserAPI } from '../../types/app-types';

export const UserCardChat = ({ user }: { user: IUserAPI }): JSX.Element => {
  return (
    <div className="userCardChat__container">
      <img src={user.picUrl} alt={user.name} />
      <div className="userChat__info">
        <p>
          {user.name} {user.lastName ? user.lastName : null}
        </p>
        <p>{user.username ? user.username : null}</p>
      </div>
    </div>
  );
};
