import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { MemberSchema } from './member-schemas';
import { ItemListSchema } from './items-schema';
import { MessageSchema } from './messages-schema';
import { IEvents } from '../../types/app-types';

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
    type: DataTypes.STRING,
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

//? One To many relation
EventsSchema.hasMany(MemberSchema, {
  foreignKey: 'event_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

MemberSchema.belongsTo(EventsSchema, {
  foreignKey: 'event_id',
  targetKey: 'id',
});

EventsSchema.hasMany(ItemListSchema, {
  foreignKey: 'event_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

ItemListSchema.belongsTo(EventsSchema, {
  foreignKey: 'event_id',
  targetKey: 'id',
});

EventsSchema.hasMany(MessageSchema, {
  foreignKey: 'event_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

MessageSchema.belongsTo(EventsSchema, {
  foreignKey: 'event_id',
  targetKey: 'id',
});
