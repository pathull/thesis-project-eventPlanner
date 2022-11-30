import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { IListItems } from '../../types/app-types';

export const ItemListSchema = sequelize.define<Model<IListItems, Optional<IListItems, 'id'>>>(
  'items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
