import { useState, useEffect } from 'react';

import './MemberCard.css';

import { IMembersAPI, IUserAPI } from '../../types/app-types';
import { getSingleUserInfo } from '../../services/fetch-users';

export const MemberCard = ({ member }: { member: IMembersAPI }): JSX.Element => {
  const [singleMember, setSingleMember] = useState<IUserAPI | null>(null);

  useEffect(() => {
    if (member.user_id) {
      void getSingleUserInfo(member.user_id).then(user => {
        if (user) setSingleMember(user);
      });
    }
  }, [member.user_id]);

  return (
    <>
      {singleMember ? (
        <div className="memberCard__container">
          <div className="memberContainer__details">
            <img
              alt={singleMember.name}
              src={
                singleMember.picUrl !== null
                  ? singleMember.picUrl
                  : 'https://res.cloudinary.com/dukuzakaw/image/upload/v1669836169/plannerApp/placeholders/user-login-icon-14_rizn4r.webp'
              }
              className="memberContainer__image"
            />
            <h2 className="memberContainer__title">{singleMember.name}</h2>
            <p>Member</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
