import { Server as SocketIo } from 'socket.io';

export const chatSocketsEvents = (io: SocketIo) => {
  io.on('connection', socket => {
    console.log('New Connection!!!', socket.id);

    // when client disconnects
    socket.on('disconnect', () => {
      console.log('User has left');
    });
  });
};
