// import { useState, useCallback } from 'react';
// import { connect, Socket } from 'socket.io-client';

// export const useSocket = (serverUrl: string) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const connectSocket = useCallback(() => {
//     const socketTemp = connect(serverUrl, {
//       transports: ['websocket'],
//     });

//     setSocket(socketTemp);
//   }, [serverUrl]);

//   const disconnectSocket = useCallback(() => {
//     if (socket) socket.disconnect();
//   }, [socket]);

//   return {
//     socket,
//     connectSocket,
//     disconnectSocket,
//   };
// };
