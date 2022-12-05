import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './MemberCard.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { env } from '../../helpers/env';
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
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              alt={singleMember.name}
              placeholderSrc={env.userImgPlaceholder}
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
