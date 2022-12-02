import express, { Application } from 'express';
import { Server as SocketIo } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
import morgan from 'morgan';

import env from '../config/env';
import appRoutes from '../routes';
import { pageNotFound } from '../middleware/pageNotFound';
import { errorHandler } from '../middleware/error-handler';
import { chatSocketsEvents } from '../sockets/chat-socket';

const app: Application = express();
const server = createServer(app);
const io = new SocketIo(server);

app.set('port', process.env.PORT || env.dbAppPort);

app.use(express.json());
app.use(
  cors({
    origin: env.clientAppUrl,
  })
);
app.use(morgan('dev'));

app.use('/', appRoutes);

app.use('*', pageNotFound);
app.use(errorHandler);

chatSocketsEvents(io);

export default { server, app };
