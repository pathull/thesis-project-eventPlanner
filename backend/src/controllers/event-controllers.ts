import { Request, Response, NextFunction } from 'express';

import { IEvents } from '../types/app-types';
import { IParamEvent } from '../types/routes-types';
import { addNewEvent, getArrayOfEvents, getSingleEvent } from '../models/daos/event-daos';

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
