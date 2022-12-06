import { Server as SocketIo } from 'socket.io';

import { createNewMessage, getListOfMessages } from '../models/daos/message-daos';
import { IMessagesEvent } from '../types/app-types';
import { IJoinRoomArgs } from '../types/socket-types';

export const chatSocketsEvents = (io: SocketIo) => {
  io.on('connection', socket => {
    console.log('New Connection!!!', socket.id);

    socket.on('join_room', async ({ userId, eventId, roomId }: IJoinRoomArgs) => {
      console.log(userId, eventId, roomId);
      socket.join(roomId);

      const msgs = await getListOfMessages(eventId);

      io.to(roomId).emit('server:all-chats', msgs);
    });

    socket.on('client:leave-room', (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on('client:newIncomingMessage', async (data: IMessagesEvent, callback) => {
      const msg = await createNewMessage(data);

      if (msg) {
        io.to(data.roomChatId).emit('server:messageChat', msg);
        callback();
      }
    });

    // when client disconnects
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} had left`);
    });
  });
};
