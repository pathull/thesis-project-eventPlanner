import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { env } from '../../helpers/env';

export const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketTemp = io(env.baseUrl, {
      transports: ['websocket'],
    });

    setSocket(socketTemp);
  }, []);

  console.log(socket);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};
