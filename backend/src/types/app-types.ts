// import { BelongsToManyAddAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize';

export interface IUser {
  id?: number;
  email: string;
  picUrl?: string;
  publicPic_id?: string;
  username?: string;
  name?: string;
  bio?: string;
  lastName?: string;
}

export interface IFileImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IEvents {
  id?: number;
  createdBy?: number;
  location: string;
  eventDate: Date;
  eventName: string;
  description: string;
  picUrl?: string;
  publicPic_id?: string;
  topic?: string;
  // addUserSchema: BelongsToManyAddAssociationMixin<IUser, number>;
  // setUserSchema: BelongsToManySetAssociationsMixin<IUser, number>;
}

export interface IMember {
  id?: number;
  activeMember?: boolean;
  user_id?: number;
  event_id?: number;
}

interface MultiSelectValues {
  value: string;
  label: string;
}

export interface IMembersResFetch {
  members: Array<MultiSelectValues>;
}
