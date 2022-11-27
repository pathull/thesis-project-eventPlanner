import { DataTypes, Model, Optional } from 'sequelize';

import { IEvents } from '../../types/app-types';
import { sequelize } from '../connectionDb';

export const EventsSchema = sequelize.define<Model<IEvents, Optional<IEvents, 'id'>>>('events', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  picUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicPic_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
});
