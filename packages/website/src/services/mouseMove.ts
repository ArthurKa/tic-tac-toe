import { ClientToServerEvents } from '@tic-tac-toe/common';
import { Vector2 } from 'three';
import { throttle } from 'throttle-debounce';
import { socket } from './socket';
import { cursor } from '../icons';

const sendMouseMove = throttle(50, (...params: Parameters<ClientToServerEvents['mouseMove']>) => {
  socket.emit('mouseMove', ...params);
});

export const useMouseMove = () => {
  const rootElement = document.getElementById('root');
  if(!rootElement) {
    throw new Error('Something went wrong. jpw08e');
  }

  const mousePosition = new Vector2();

  const pointermove = (event: PointerEvent) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = 1 - (event.clientY / window.innerHeight) * 2;

    sendMouseMove([mousePosition.x, mousePosition.y]);
  };
  const mouseMove = (id: string, [x, y]: [number, number], names: string[]) => {
    let div = document.getElementById(id);
    if(!div) {
      div = document.createElement('div');
      div.id = id;
      div.style.position = 'absolute';
      div.style.backgroundImage = `url('${cursor}')`;
      div.style.minHeight = '30px';
      div.style.backgroundSize = '30px';
      div.style.backgroundPosition = 'top -4px left -9px';
      div.style.zIndex = '10';
      div.style.pointerEvents = 'none';
      div.style.fontFamily = 'monospace';

      rootElement.append(div);
    }

    div.style.left = `${(x + 1) / 2 * window.innerWidth}px`;
    div.style.top = `${(1 - y) / 2 * window.innerHeight}px`;
    div.innerHTML = names.map(e => `<div style="margin-left: 20px">${e}</div>`).join('');
  };
  const removeMousePointer = (id: string) => {
    document.getElementById(id)?.remove();
  };

  window.addEventListener('pointermove', pointermove);
  socket.on('mouseMove', mouseMove);
  socket.on('removeMousePointer', removeMousePointer);

  return () => {
    window.removeEventListener('pointermove', pointermove);
    socket.off('mouseMove', mouseMove);
    socket.off('removeMousePointer', removeMousePointer);
  };
};
