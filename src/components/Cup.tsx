import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { BoxHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { NODE_ENV } from '../envVariables';
import { tinkercadScaleMultiplier } from '../constants';

export type CupProps = {
  position: [number, number];
  size: 'small' | 'medium' | 'big';
  color: string;
};

export const bigCupOuterDiameter = 14 * tinkercadScaleMultiplier;

export const cupSizeMultiplier = {
  big: 1,
  medium: 0.7,
  small: 0.4,
} satisfies Record<CupProps['size'], number>;

export const Cup: React.FC<CupProps> = ({ size, color, position: [x, y] }) => {
  const object = useLoader(STLLoader, '/models/TicTacToeCup.stl');
  const ref = useRef<THREE.Mesh>(null);

  if(NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHelper(ref, BoxHelper, 'red');
  }

  return (
    <mesh {...{
      ref,
      scale: tinkercadScaleMultiplier * cupSizeMultiplier[size],
      'rotation-x': -Math.PI / 2,
      receiveShadow: true,
      castShadow: true,
      position: [x, 0, y],
    }}
    >
      <primitive {...{ object }} />
      <meshStandardMaterial {...{ color }} />
    </mesh>
  );
};
