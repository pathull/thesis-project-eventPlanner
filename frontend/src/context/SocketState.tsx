import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Socket, connect } from 'socket.io-client';

import { SocketContext } from './SocketContext';
import { env } from '../helpers/env';

export const SocketState = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth0();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isAuthenticated && !socket) {
      const socketTemp = connect(env.baseUrl, {
        transports: ['websocket'],
      });

      setSocket(socketTemp);
    }

    console.log('How much this is running');
  }, [isAuthenticated, socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
