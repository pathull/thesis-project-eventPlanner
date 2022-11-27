import { EventsSchema } from '../schemas/event-schema';
import { MemberSchema } from '../schemas/member-schemas';
import { uploadImage } from '../../services/cloudinary';
import { checkId, removeImageFromServer } from '../../helpers/helpers-functions';
import { IEvents, IFileImage, IMember, IMembersResFetch } from '../../types/app-types';
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

export const addMemberToEvent = async (userId: string, eventId: string, data: IMembersResFetch) => {
  if (checkId(userId) && checkId(eventId)) {
    const findEvent = await EventsSchema.findOne({
      where: {
        createdBy: userId,
        id: eventId,
      },
    });

    if (findEvent && Array.isArray(data.members)) {
      //TODO check how the data is coming???
      const membersToAdd = data.members.map(element => {
        if (checkId(element.value) && element.value !== userId) {
          return { user_id: Number(element.value), event_id: Number(eventId) };
        }
      }) as unknown as IMember[];

      const listOfMembers = await MemberSchema.bulkCreate(membersToAdd);

      return listOfMembers;
    }
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
