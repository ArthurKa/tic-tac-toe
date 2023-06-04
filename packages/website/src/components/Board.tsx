import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { BoxHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { NODE_ENV } from '../envVariables';
import { boardColor, tinkercadScaleMultiplier } from '../constants';

export const Board: React.FC = () => {
  const object = useLoader(STLLoader, '/models/TicTacToeBoard.stl');
  const ref = useRef<THREE.Mesh>(null);

  if(NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHelper(ref, BoxHelper, 'red');
  }

  return (
    <mesh {...{
      ref,
      scale: tinkercadScaleMultiplier,
      'rotation-x': -Math.PI / 2,
      receiveShadow: true,
      castShadow: true,
    }}
    >
      <primitive {...{ object }} />
      <meshStandardMaterial {...{ color: boardColor }} />
    </mesh>
  );
};
