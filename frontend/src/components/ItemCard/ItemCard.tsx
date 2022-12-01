import { useState, useContext, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import './ItemCard.css';

import { UserContext } from '../../context/UserContext';
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

  const handleClick = async () => {
    if (userCtx?.userInfo?.id) {
      const isAMember = event.members.map(member => member.user_id).includes(userCtx.userInfo.id);

      if (isAMember) {
        const isCollaborating = collaborators.map(element => element.id).includes(userCtx.userInfo.id);

        if (!isCollaborating) {
          const newCollaboration = await addCollaborator(item.id, userCtx.userInfo.id, event.id);

          if (newCollaboration) {
            setCollaborators(prev => [...prev, newCollaboration]);
            return;
          }

          toast.error('Could not add your collaboration, try again', {
            duration: 3000,
            position: 'top-left',
            style: { background: '#363636', color: '#fff' },
          });
        }

        const newList = await removeCollaboration(item.id, userCtx.userInfo.id);

        if (Array.isArray(newList)) {
          setCollaborators(newList);
          return;
        }

        toast.error('Error: Collaboration was not removed, try again', {
          duration: 3000,
          position: 'top-left',
          style: { background: '#363636', color: '#fff' },
        });
      }

      toast('You are not part of this event, please join in!', {
        duration: 3000,
        position: 'top-left',
        style: { background: '#363636', color: '#fff' },
      });
    }
  };

  return (
    <div>
      <button type="button" onClick={() => void handleClick()}>
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
