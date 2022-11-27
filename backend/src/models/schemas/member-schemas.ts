import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../connectionDb';
import { IMember } from '../../types/app-types';

export const MemberSchema = sequelize.define<Model<IMember, Optional<IMember, 'id'>>>('members', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  activeMember: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

//? Many to Many relationship
// UserSchema.belongsToMany(EventsSchema, {
//   through: MemberSchema,
//   foreignKey: 'user_id',
// });

// EventsSchema.belongsToMany(UserSchema, {
//   through: MemberSchema,
//   foreignKey: 'event_id',
// });

// UserSchema.hasMany(MemberSchema, {
//   foreignKey: 'user_id',
//   sourceKey: 'id',
// });

// MemberSchema.belongsTo(UserSchema, {
//   foreignKey: 'user_id',
//   targetKey: 'id',
// });

// EventsSchema.hasMany(MemberSchema, {
//   foreignKey: 'event_id',
//   sourceKey: 'id',
// });

// MemberSchema.belongsTo(EventsSchema, {
//   foreignKey: 'event_id',
//   targetKey: 'id',
// });
