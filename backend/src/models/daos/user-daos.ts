import { UserSchema } from '../schemas/user-schemas';

import { checkValidEmail, checkId, removeImageFromServer } from '../../helpers/helpers-functions';
import { deleteImage, uploadImage } from '../../services/cloudinary';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';
import { IUser, IFileImage } from '../../types/app-types';

export const addNewUserToDB = async (data: IUser) => {
  const { email, username, picUrl } = data;

  if (checkValidEmail(email)) {
    const userFound = await UserSchema.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
    });

    if (!userFound) {
      const newUser = await UserSchema.create({
        email,
        bio: '',
        username,
        picUrl,
        publicPic_id: '',
        lastName: '',
        name: '',
      });

      return newUser;
    } else {
      return userFound;
    }
  }

  throw new AppErrors({ message: 'Please enter a valid email', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const getSingleUserInfo = (userId: string) => {
  if (checkId(userId)) {
    const user = UserSchema.findByPk(userId, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
    });

    return user;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const retrieveArrayOfUsers = async () => {
  const listsOfUsers = await UserSchema.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
  });

  return listsOfUsers;
};

export const modifyUserInfo = async (userId: string, data: IUser, picture?: IFileImage) => {
  const { name, lastName, username, bio } = data;
  if (checkId(userId)) {
    const user = await UserSchema.findOne({ where: { id: userId } });

    if (user) {
      user.set({ name, lastName, username, bio });

      if (picture) {
        const publicId = user.getDataValue('publicPic_id');
        const result = await uploadImage(picture.path, 'users');

        if (publicId) deleteImage(publicId); //TODO Check image was deleted in cloudinary

        user.set({
          picUrl: result.secure_url,
          publicPic_id: result.public_id,
        });

        removeImageFromServer(picture.path); //TODO check image was deleted from server
      }

      await user.save();

      return user;
    } else {
      if (picture) removeImageFromServer(picture.path); //TODO check image was deleted from server

      throw new AppErrors({ message: 'User does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
    }
  }

  if (picture) removeImageFromServer(picture.path); //TODO check image was deleted from server
  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
