// import { useState, useCallback } from 'react';
// import { connect, Socket } from 'socket.io-client';

// export const useSocket = (serverUrl: string) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const connectSocket = useCallback(() => {
//     const socketTemp = connect(serverUrl, {
//       transports: ['websocket'],
//       autoConnect: true,
//       // forceNew: true,
//     });

//     setSocket(socketTemp);
//   }, [serverUrl]);

//   const disconnectSocket = useCallback(() => {
//     socket?.disconnect();
//   }, [socket]);

//   return {
//     socket,
//     connectSocket,
//     disconnectSocket,
//   };
// };
