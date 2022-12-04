import { Server as SocketIo } from 'socket.io';

import { createNewMessage } from '../models/daos/message-daos';
import { IMessagesEvent } from '../types/app-types';
import { IJoinRoomArgs } from '../types/socket-types';

export const chatSocketsEvents = (io: SocketIo) => {
  io.on('connection', socket => {
    console.log('New Connection!!!', socket.id);

    socket.on('join_room', ({ userId, eventId, roomId }: IJoinRoomArgs) => {
      socket.join(roomId);
      console.log(userId, eventId, roomId);
    });

    socket.on('client:newIncomingMessage', async (data: IMessagesEvent) => {
      const msg = await createNewMessage(data);

      if (msg) {
        io.to(msg.getDataValue('roomChatId')).emit('server:messageChat', msg);
      }
    });

    // when client disconnects
    socket.on('disconnect', () => {
      console.log('User had left');
    });
  });
};
