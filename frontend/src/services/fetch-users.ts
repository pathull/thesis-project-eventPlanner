import { env } from '../helpers/env';
import { IUser, ServerErrors } from '../types/app-types';

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

    const newUser = (await result.json()) as unknown as IUser | ServerErrors;

    return newUser;
  } catch (err) {
    console.error(err);
  }
};
