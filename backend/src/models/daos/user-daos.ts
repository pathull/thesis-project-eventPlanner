import { UserSchema } from '../schemas/user-schemas';

import { checkValidEmail, checkId } from '../../helpers/helpers-functions';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';
import { IUser } from '../../types/app-types';

export const addNewUserToDB = async (data: IUser) => {
  const { email, username, userPicUrl } = data;

  if (checkValidEmail(email)) {
    const userFound = await UserSchema.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt', 'public_picture_id'] },
    });

    if (!userFound) {
      const newUser = await UserSchema.create({
        email,
        bio: '',
        username,
        userPicUrl,
        public_picture_id: '',
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
      attributes: { exclude: ['createdAt', 'updatedAt', 'public_picture_id'] },
    });

    return user;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const retrieveArrayOfUsers = async () => {
  const listsOfUsers = await UserSchema.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'public_picture_id'] },
  });

  return listsOfUsers;
};
