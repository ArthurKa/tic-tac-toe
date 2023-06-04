import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { BoxHelper, Plane, Ray, Vector3 } from 'three';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring } from '@react-spring/three';
import { NODE_ENV } from '../envVariables';
import { tinkercadScaleMultiplier } from '../constants';

export type CupProps = {
  position: [number, number];
  size: 'small' | 'medium' | 'big';
  color: string;
  outerGroupPosition: [number, number, number];
  outerGroupScale: [number, number, number];
};

export const bigCupOuterDiameter = 14 * tinkercadScaleMultiplier;

export const cupSizeMultiplier = {
  big: 1,
  medium: 0.7,
  small: 0.4,
} satisfies Record<CupProps['size'], number>;

const floorPlane = new Plane(new Vector3(0, 1, 0));
const planeIntersectPoint = new Vector3();

export const Cup: React.FC<CupProps> = ({
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

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 0],
  }));

  const bind = useDrag(({ active, event }) => {
    if('ray' in event && event.ray instanceof Ray) {
      event.ray.intersectPlane(floorPlane, planeIntersectPoint);
    }

    api.start({
      position: [
        (planeIntersectPoint.x - outerGroupPosition[0]) * outerGroupScale[0] - x,
        (active ? cupSizeMultiplier[size] / 2 : 0) - outerGroupPosition[1] * outerGroupScale[1],
        (planeIntersectPoint.z - outerGroupPosition[2]) * outerGroupScale[2] - y,
      ],
    });
  });

  return (
    // @ts-expect-error
    <a.group {...{
      ...spring,
      ...bind(),
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
