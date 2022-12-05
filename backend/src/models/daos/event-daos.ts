import { EventsSchema } from '../schemas/event-schema';
import { MemberSchema } from '../schemas/member-schemas';
import { ItemListSchema } from '../schemas/items-schema';
import { MemberItemsSchema } from '../schemas/memberItems-schema';
import { UserSchema } from '../schemas/user-schemas';
import { uploadImage } from '../../services/cloudinary';
import { checkId, removeImageFromServer } from '../../helpers/helpers-functions';
import { IEvents, IFileImage, IMember, IMembersResFetch } from '../../types/app-types';
import { IItemsBody } from '../../types/routes-types';
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
  const allEvents = await EventsSchema.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
    order: [['eventDate', 'ASC']],
  });

  return allEvents;
};

export const getSingleEvent = async (eventId: string) => {
  if (checkId(eventId)) {
    const event = await EventsSchema.findOne({
      where: { id: eventId },
      attributes: { exclude: ['createdAt', 'updatedAt', 'publicPic_id'] },
      include: [
        {
          model: MemberSchema,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: ItemListSchema,
        },
      ],
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
      const members = data.members
        .filter(member => checkId(member.value) && member.value !== userId)
        .map(element => ({ user_id: Number(element.value), event_id: Number(eventId) })) as unknown as IMember[];

      const listOfMembers = await MemberSchema.bulkCreate(members);

      return listOfMembers;
    }
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const insertItemsIntoDb = async (eventId: string, data: IItemsBody) => {
  if (checkId(eventId)) {
    const eventFound = await EventsSchema.findByPk(eventId);

    if (eventFound) {
      if (Array.isArray(data.items) && data.items.length > 0) {
        const itemList = data.items.map(element => ({ item_name: element.item_name, event_id: Number(eventId) }));

        const list = await ItemListSchema.bulkCreate(itemList);
        return list;
      }
    } else {
      throw new AppErrors({ message: 'Event does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
    }
  }

  throw new AppErrors({ message: 'Invalid ID or Data is not coming', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const addCollaborator = async (itemId: string, userId: string, data: { eventId: number }) => {
  if (checkId(itemId) && checkId(userId) && checkId(data.eventId)) {
    const itemFound = ItemListSchema.findByPk(itemId);
    const memberExist = MemberSchema.findOne({
      where: { event_id: data.eventId, user_id: userId },
    });

    const [item, member] = await Promise.all([itemFound, memberExist]);

    if (item && member) {
      const addCollaborator = MemberItemsSchema.create({
        item_id: Number(itemId),
        added: true,
        member_id: Number(userId),
      });

      const userDetails = UserSchema.findOne({
        where: { id: userId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      const [newCollaboration, user] = await Promise.all([addCollaborator, userDetails]);

      if (newCollaboration) {
        return user;
      }

      throw new AppErrors({ message: 'Error adding collaboration', httpCode: HttpStatusCode.BAD_REQUEST, code: 5 });
    }
  }

  throw new AppErrors({ message: 'Invalid ID or Data is not coming', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const listCollaboratorsPerItem = async (itemId: string) => {
  if (checkId(itemId)) {
    const items = await MemberItemsSchema.findAll({
      where: { item_id: itemId },
      include: [
        {
          model: UserSchema,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    const userList = items.map(item => item.toJSON().user);

    return userList;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const deleteCollaborations = async (itemId: string, userId: string) => {
  if (checkId(itemId) && checkId(userId)) {
    const removeCollaboration = await MemberItemsSchema.destroy({ where: { item_id: itemId, member_id: userId } });

    if (removeCollaboration) {
      const newList = await listCollaboratorsPerItem(itemId);
      return newList;
    }

    throw new AppErrors({ message: 'Collaboration was not removed', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const listOfMembers = async (eventId: string) => {
  if (checkId(eventId)) {
    const list = await MemberSchema.findAll({
      where: { event_id: eventId },
      include: {
        model: UserSchema,
      },
    });

    const users = list.map(item => item.toJSON().user);
    return users;
  }

  throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
