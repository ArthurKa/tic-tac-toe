import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '@tic-tac-toe/common';
import { API_URL } from '../envVariables';
import { getRoomId } from './roomId';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_URL);

export const connectSocketHandlers = () => {
  const connect = () => {
    socket.emit('joinRoom', getRoomId());
  };

  socket.on('connect', connect);

  return () => {
    socket.off('connect', connect);
  };
};
