import { DataTypes, Model, Optional } from 'sequelize';

import { IUser } from '../../types/app-types';
import { sequelize } from '../connectionDb';

export const UserSchema = sequelize.define<Model<IUser, Optional<IUser, 'id'>>>('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Enter a valid Email',
      },
    },
  },
  userPicUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public_picture_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
