import { Server } from 'socket.io';
import { createServer } from 'http';
import { ClientToServerEvents, ServerToClientEvents } from '@tic-tac-toe/common';
import { WEBSITE_URL } from './envVariables';

// eslint-disable-next-line @typescript-eslint/ban-types
type InterServerEvents = {};

// eslint-disable-next-line @typescript-eslint/ban-types
type SocketData = {};

export const connectSocket = (server: ReturnType<typeof createServer>) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: { origin: WEBSITE_URL },
  });

  io.on('connection', socket => {
    socket.on('joinRoom', roomId => {
      socket.join(roomId);

      socket.on('setCupPosition', (...params) => {
        socket.to(roomId).emit('setCupPosition', ...params);
      });
    });
  });
};
