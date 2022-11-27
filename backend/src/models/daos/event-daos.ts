import { EventsSchema } from '../schemas/event-schema';
import { uploadImage } from '../../services/cloudinary';
import { checkId, removeImageFromServer } from '../../helpers/helpers-functions';
import { IEvents, IFileImage } from '../../types/app-types';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const addNewEvent = async (data: IEvents, picture?: IFileImage) => {
  const { eventName, description, eventDate, location, createdBy } = data;

  if (eventDate && description && eventName && location && createdBy) {
    const newEvent = EventsSchema.build({ eventDate, eventName, description, location, createdBy });

    if (picture) {
      const result = await uploadImage(picture.path, 'events');

      newEvent.set({
        picUrl: result.secure_url,
        publicPic_id: result.public_id,
      });

      removeImageFromServer(picture.path);
    }

    await newEvent.save();

    return newEvent;
  }

  if (picture) removeImageFromServer(picture.path);

  throw new AppErrors({ message: 'Invalid information', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const getArrayOfEvents = async () => {
  const allEvents = await EventsSchema.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] } });

  return allEvents;
};

export const getSingleEvent = async (eventId: string) => {
  if (checkId(eventId)) {
    const event = await EventsSchema.findByPk(eventId, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
    });

    return event;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
