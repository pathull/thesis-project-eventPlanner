import { useState, useEffect } from 'react';

import './ChatMembersList.css';

import { UserCardChat } from '../UserCardChat/UserCardChat';
import { retrieveListOfMembers } from '../../services/fetch-events';
import { IEvents, IUserAPI } from '../../types/app-types';

export const ChatMembersList = ({ event }: { event: IEvents }) => {
  const [listOfMembers, setListOfMembers] = useState<IUserAPI[]>([]);

  useEffect(() => {
    if (event) {
      void retrieveListOfMembers(event.id).then(users => {
        if (users) setListOfMembers(users);
      });
    }
  }, [event]);

  return (
    <div className="listMembersChat__container">
      {listOfMembers.length > 0 ? listOfMembers.map(user => <UserCardChat key={user.id} user={user} />) : null}
    </div>
  );
};
