import { Server } from 'socket.io';
import { createServer } from 'http';
import { ClientToServerEvents, ServerToClientEvents } from '@tic-tac-toe/common';
import { WEBSITE_URL } from './envVariables';
import { getLocationByIP } from './services';
import { InterServerEvents, SocketData } from './types';

export const connectSocket = (server: ReturnType<typeof createServer>) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: { origin: WEBSITE_URL },
  });

  io.on('connection', socket => {
    getLocationByIP(socket);

    socket.on('joinRoom', roomId => {
      socket.join(roomId);

      socket.on('disconnect', () => {
        socket.to(roomId).emit('removeMousePointer', socket.id);
        socket.leave(roomId);
      });

      socket.on('sendCupPosition', (...params) => {
        socket.to(roomId).emit('sendCupPosition', ...params);
      });
      socket.on('shareCupPosition', (...params) => {
        socket.to(roomId).emit('shareCupPosition', ...params);
      });

      socket.on('mouseMove', async position => {
        socket.to(roomId).emit('mouseMove', socket.id, position, await getLocationByIP(socket));
      });
    });
  });
};
