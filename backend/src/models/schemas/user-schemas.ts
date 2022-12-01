import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { EventsSchema } from '../schemas/event-schema';
import { MemberSchema } from './member-schemas';
import { MemberItemsSchema } from './memberItems-schema';
import { IUser } from '../../types/app-types';

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
  picUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicPic_id: {
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

//? One to many relations
UserSchema.hasMany(EventsSchema, {
  foreignKey: 'createdBy',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

EventsSchema.belongsTo(UserSchema, {
  foreignKey: 'createdBy',
  targetKey: 'id',
});

UserSchema.hasMany(MemberSchema, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

MemberSchema.belongsTo(UserSchema, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

UserSchema.hasMany(MemberItemsSchema, {
  foreignKey: 'member_id',
  sourceKey: 'id',
});

MemberItemsSchema.belongsTo(UserSchema, {
  foreignKey: 'member_id',
  targetKey: 'id',
});
