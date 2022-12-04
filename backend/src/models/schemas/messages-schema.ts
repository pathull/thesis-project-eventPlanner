import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { IMessagesEvent } from '../../types/app-types';

export const MessageSchema = sequelize.define<Model<IMessagesEvent, Optional<IMessagesEvent, 'id'>>>('messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomChatId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
