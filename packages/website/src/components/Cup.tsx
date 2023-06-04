import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { BoxHelper, Plane, Ray, Vector3 } from 'three';
import { useHelper } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring } from '@react-spring/three';
import { tuple } from '@arthurka/ts-utils';
import { throttle } from 'throttle-debounce';
import { ClientToServerEvents, ServerToClientEvents } from '@tic-tac-toe/common';
import { NODE_ENV } from '../envVariables';
import { tinkercadScaleMultiplier } from '../constants';
import { socket } from '../services';

export type CupProps = {
  position: [number, number];
  size: 'small' | 'medium' | 'big';
  color: string;
  outerGroupPosition: [number, number, number];
  outerGroupScale: [number, number, number];
  id: string;
};

export const bigCupOuterDiameter = 14 * tinkercadScaleMultiplier;

export const cupSizeMultiplier = {
  big: 1,
  medium: 0.7,
  small: 0.4,
} satisfies Record<CupProps['size'], number>;

const floorPlane = new Plane(new Vector3(0, 1, 0));
const planeIntersectPoint = new Vector3();

const sendCupPosition = throttle(100, (...params: Parameters<ClientToServerEvents['sendCupPosition']>) => {
  socket.emit('sendCupPosition', ...params);
});

export const Cup: React.FC<CupProps> = ({
  id,
  size,
  color,
  outerGroupPosition,
  outerGroupScale,
  position: [x, y],
}) => {
  const object = useLoader(STLLoader, '/models/TicTacToeCup.stl');
  const ref = useRef<THREE.Mesh>(null);

  if(NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHelper(ref, BoxHelper, 'red');
  }

  const curPosition = useRef<[number, number, number] | null>(null);

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
  }));

  const getDragEvents = useDrag(({ active, event }) => {
    if('ray' in event && event.ray instanceof Ray) {
      event.ray.intersectPlane(floorPlane, planeIntersectPoint);
    }

    const position = tuple(
      (planeIntersectPoint.x - outerGroupPosition[0]) * outerGroupScale[0] - x,
      (active ? cupSizeMultiplier[size] / 2 : 0) - outerGroupPosition[1] * outerGroupScale[1],
      (planeIntersectPoint.z - outerGroupPosition[2]) * outerGroupScale[2] - y,
    );

    curPosition.current = position;
    api.start({ position });
    sendCupPosition(id, position);
  });

  useEffect(() => {
    const sendCupPosition: ServerToClientEvents['sendCupPosition'] = (_id, position) => {
      if(_id === id) {
        curPosition.current = position;
        api.start({ position });
      }
    };

    socket.on('sendCupPosition', sendCupPosition);

    return () => {
      socket.off('sendCupPosition', sendCupPosition);
    };
  }, [api, id]);

  useEffect(() => {
    const shareCupPosition = () => {
      if(curPosition.current) {
        socket.emit('sendCupPosition', id, curPosition.current);
      }
    };

    socket.on('shareCupPosition', shareCupPosition);
    socket.emit('shareCupPosition', id);

    return () => {
      socket.off('shareCupPosition', shareCupPosition);
    };
  }, [id]);

  return (
    // @ts-expect-error
    <a.group {...{
      ...spring,
      ...getDragEvents(),
    }}
    >
      <a.mesh {...{
        ref,
        scale: tinkercadScaleMultiplier * cupSizeMultiplier[size],
        'rotation-x': -Math.PI / 2,
        receiveShadow: true,
        castShadow: true,
        position: [x, 0, y],
        userData: {
          isCup: true,
        },
      }}
      >
        <primitive {...{ object }} />
        <meshStandardMaterial {...{ color }} />
      </a.mesh>
    </a.group>
  );
};
