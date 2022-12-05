import { MessageSchema } from '../schemas/messages-schema';
import { MemberSchema } from '../schemas/member-schemas';
import { UserSchema } from '../schemas/user-schemas';
import { IMessagesEvent } from '../../types/app-types';
import { checkId } from '../../helpers/helpers-functions';
import { AppErrors, HttpStatusCode } from '../../helpers/app-error';

export const createNewMessage = async (data: IMessagesEvent) => {
  const { event_id, user_id, message } = data;

  if (checkId(event_id) && checkId(user_id) && message !== '') {
    const isAMember = MemberSchema.findOne({ where: { event_id: event_id, user_id: user_id } });
    const userFound = UserSchema.findOne({
      where: { id: user_id },
      attributes: { include: ['picUrl', 'name', 'lastName', 'id'] },
    });

    const [member, user] = await Promise.all([isAMember, userFound]);

    if (member && user) {
      const newMessage = await MessageSchema.create(data);

      return {
        ...newMessage.dataValues,
        user,
      };
    }
  }

  throw new AppErrors({ message: 'Invalid Credentials', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const getListOfMessages = async (eventId: number) => {
  if (checkId(eventId)) {
    const messages = await MessageSchema.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: UserSchema,
          attributes: { include: ['picUrl', 'name', 'lastName', 'id'] },
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    return messages;
  }

  throw new AppErrors({ message: 'Invalid Credentials', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
