import { MessageSchema } from '../schemas/messages-schema';
import { MemberSchema } from '../schemas/member-schemas';
import { IMessagesEvent } from '../../types/app-types';

export const createNewMessage = async (data: IMessagesEvent) => {
  const isAMember = await MemberSchema.findOne({ where: { event_id: data.event_id, user_id: data.user_id } });

  if (isAMember) {
    const newMessage = await MessageSchema.create(data);

    return newMessage;
  }
};
