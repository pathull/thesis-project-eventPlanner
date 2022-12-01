import { Request, Response, NextFunction } from 'express';

import { IEvents } from '../types/app-types';
import { IParamEvent, IParamMember, IItemsBody, IParamsCollaborator } from '../types/routes-types';
import {
  addNewEvent,
  getArrayOfEvents,
  getSingleEvent,
  addMemberToEvent,
  insertItemsIntoDb,
  addCollaborator,
  listCollaboratorsPerItem,
  deleteCollaborations,
} from '../models/daos/event-daos';

export const createNewEvent = async (req: Request<never, never, IEvents>, res: Response, next: NextFunction) => {
  try {
    const newEvent = await addNewEvent(req.body, req.file);
    return res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveListsOfEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const arrayEvents = await getArrayOfEvents();
    return res.status(200).json(arrayEvents);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveSingleEvent = async (req: Request<IParamEvent>, res: Response, next: NextFunction) => {
  try {
    const event = await getSingleEvent(req.params.eventId);

    if (event) return res.status(200).json(event);
    return res.status(400).json({ message: 'Event not Found', error: true, code: 3 });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const insertNewMemberToEvent = async (req: Request<IParamMember>, res: Response, next: NextFunction) => {
  try {
    const listMembers = await addMemberToEvent(req.params.userId, req.params.eventId, req.body);

    return res.status(200).json(listMembers);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const insertListOfItems = async (
  req: Request<IParamEvent, never, IItemsBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await insertItemsIntoDb(req.params.eventId, req.body);

    return res.status(201).json(items);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addCollaboratorToItemList = async (
  req: Request<IParamsCollaborator, never, { eventId: number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userMember = await addCollaborator(req.params.itemId, req.params.userId, req.body);

    return res.status(201).json(userMember);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getListCollaborators = async (req: Request<IParamsCollaborator>, res: Response, next: NextFunction) => {
  try {
    const list = await listCollaboratorsPerItem(req.params.itemId);

    return res.status(200).json(list);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const removeCollaboration = async (req: Request<IParamsCollaborator>, res: Response, next: NextFunction) => {
  try {
    const list = await deleteCollaborations(req.params.itemId, req.params.userId);
    return res.status(200).json(list);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
