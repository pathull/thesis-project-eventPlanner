import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { IMemberItems } from '../../types/app-types';

export const MemberItemsSchema = sequelize.define<Model<IMemberItems, Optional<IMemberItems, 'id'>>>(
  'member-items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    added: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
