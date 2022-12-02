import { useState, useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import './ItemCard.css';

import { UserContext } from '../../context/UserContext';
import { showToast, errorToast } from '../../helpers/toasts';
import { getListCollaborators, addCollaborator, removeCollaboration } from '../../services/fetch-events';
import { IListItems, IUserAPI, ISingleEvent } from '../../types/app-types';

interface IProps {
  item: IListItems;
  event: ISingleEvent;
}

export const ItemCard = ({ item, event }: IProps) => {
  const userCtx = useContext(UserContext);
  const [collaborators, setCollaborators] = useState<IUserAPI[]>([]);

  useEffect(() => {
    void getListCollaborators(item.id).then(list => {
      if (Array.isArray(list) && list.length > 0) {
        setCollaborators(list);
      }

      //TODO if send an error do something
    });
  }, [item.id]);

  const handleClick = () => {
    if (userCtx?.userInfo?.id) {
      const isAMember = event.members.map(member => member.user_id).includes(userCtx.userInfo.id);

      if (isAMember) {
        const isCollaborating = collaborators.map(element => element.id).includes(userCtx.userInfo.id);

        if (!isCollaborating) {
          void insertCollaborator(userCtx.userInfo.id);
          return;
        }

        void deleteCollaboration(userCtx.userInfo.id);
        return;
      }

      showToast('You are not part of this event, please join in!');
    }
  };

  const insertCollaborator = async (userId: number) => {
    const newCollaboration = await addCollaborator(item.id, userId, event.id);

    if (newCollaboration) {
      setCollaborators(prev => [...prev, newCollaboration]);
      return;
    }

    errorToast('Could not add your collaboration, try again');
  };

  const deleteCollaboration = async (userId: number) => {
    const newList = await removeCollaboration(item.id, userId);

    if (Array.isArray(newList)) {
      setCollaborators(newList);
      return;
    }

    errorToast('Error: Collaboration was not removed, try again');
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        <div className="itemCard__container">
          <h2 className="itemCard_title">{item.item_name}</h2>
          <div className="itemCard__collaborator">
            <h3>Collaborator ({collaborators.length})</h3>
            <div className="collaboratorContainer">
              {collaborators.length > 0 ? (
                collaborators.map(user => (
                  <p className="collaborator" key={user.id}>
                    - {user.name} {user.lastName !== '' ? user.lastName : null}
                  </p>
                ))
              ) : (
                <p className="text-zinc-600 mt-6 font-semibold">No Collaborators</p>
              )}
            </div>
          </div>
        </div>
      </button>

      <Toaster reverseOrder={true} />
    </div>
  );
};
