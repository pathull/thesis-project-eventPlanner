import { env } from '../helpers/env';
import { IUser, ServerErrors, IUserAPI } from '../types/app-types';

export const createNewUser = async (data: IUser) => {
  try {
    const result = await fetch(`${env.baseUrl}/api/users`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newUser = (await result.json()) as unknown as IUserAPI | ServerErrors;

    return newUser;
  } catch (err) {
    console.error(err);
  }
};

export const retrieveMembersList = async (userId: number) => {
  try {
    if (userId) {
      const list = await fetch(`${env.baseUrl}/api/users/all-users/${userId}`, {
        method: 'GET',
        mode: 'cors',
      });

      const result = (await list.json()) as IUserAPI[];

      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
