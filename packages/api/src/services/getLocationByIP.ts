import { ClientToServerEvents, ServerToClientEvents } from '@tic-tac-toe/common';
import { Socket } from 'socket.io';
import { ObjEntries, ObjValues } from '@arthurka/ts-utils';
import TempObject from 'temp-object';
import { lookup } from 'geoip-lite';
import { InterServerEvents, IPLookup, SocketData } from '../types';

const locationsCache = new TempObject<Record<string, Promise<string[]>>>(60_000);

export const getLocationByIP = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
): Promise<string[]> => {
  const ip = socket.handshake.address.split(',').pop() ?? '';

  if(!lookup(ip)) {
    return Promise.resolve(['Unknown']);
  }

  const fromCache = locationsCache[ip];
  if(fromCache) {
    return fromCache;
  }

  const result = fetch('https://api.whatismyip.com/app.php', {
    method: 'POST',
    body: ObjEntries({
      action: 'ip-lookup',
      ip,
    }).map(e => e.map(encodeURIComponent).join('=')).join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'https://www.whatismyip.com',
    },
  })
    .then(e => e.json() as Promise<Record<string, IPLookup>>)
    .then(e => (
      ObjValues(e)
        .filter(({ city, region }) => city && region)
        .map(({ city, region }) => `${city}, ${region}`)
    ));

  locationsCache[ip] = result;

  return result;
};
