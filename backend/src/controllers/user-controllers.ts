import { Request, Response, NextFunction } from 'express';

import { IUser } from '../types/app-types';
import { IParamReqUser } from '../types/routes-types';
import {
  addNewUserToDB,
  getSingleUserInfo,
  retrieveArrayOfUsers,
  modifyUserInfo,
  userListsMembers,
} from '../models/daos/user-daos';

export const retrieveUserInfo = async (req: Request<IParamReqUser>, res: Response, next: NextFunction) => {
  try {
    const user = await getSingleUserInfo(req.params.userId);

    if (user) return res.status(200).json(user);
    return res.status(400).json({ message: 'User does not exist', error: true, code: 3 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const createNewUser = async (req: Request<never, never, IUser, never>, res: Response, next: NextFunction) => {
  try {
    const user = await addNewUserToDB(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getListOfUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const listUsers = await retrieveArrayOfUsers();
    return res.status(200).json(listUsers);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await modifyUserInfo(req.params.userId, req.body, req.file);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const userListsNoCurrentUser = async (req: Request<IParamReqUser>, res: Response, next: NextFunction) => {
  try {
    const users = await userListsMembers(req.params.userId);
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
