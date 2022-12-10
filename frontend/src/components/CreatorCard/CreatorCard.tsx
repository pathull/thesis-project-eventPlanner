import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { env } from '../../helpers/env';
import { IUserAPI } from '../../types/app-types';

export const CreatorCard = ({ creator }: { creator: IUserAPI }): JSX.Element => {
  return (
    <>
      {creator ? (
        <div className="memberCard__container">
          <div className="memberContainer__details">
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              alt={creator.name}
              placeholderSrc={env.userImgPlaceholder}
              src={
                creator.picUrl !== null
                  ? creator.picUrl
                  : 'https://res.cloudinary.com/dukuzakaw/image/upload/v1669836169/plannerApp/placeholders/user-login-icon-14_rizn4r.webp'
              }
              className="memberContainer__image"
            />
            <h2 className="memberContainer__title">{creator.name}</h2>
            <p>Organizer</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
