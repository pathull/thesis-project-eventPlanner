import { IListItems } from '../../types/app-types';

import './ItemCard.css';

interface IProps {
  item: IListItems;
}

export const ItemCard = ({ item }: IProps) => {
  return (
    <div className="itemCard__container">
      <h2 className="itemCard_title">{item.item_name}</h2>
      <div>
        <h3>Collaborator (0)</h3>
      </div>
    </div>
  );
};
