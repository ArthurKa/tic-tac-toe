import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';
import { NODE_ENV } from '../envVariables';
import { groundColor, skyColor } from '../constants';

export const Lights: React.FC = () => {
  const ref = useRef<THREE.DirectionalLight>(null);

  if(NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHelper(ref, DirectionalLightHelper, 5, 'yellow');
  }

  return (
    <>
      <directionalLight {...{
        ref,
        position: [50, 50, -50],
        castShadow: true,
        'shadow-mapSize-height': 1000,
        'shadow-mapSize-width': 1000,
        'shadow-camera-left': -20,
        'shadow-camera-right': 20,
        'shadow-camera-top': 20,
        'shadow-camera-bottom': -20,
      }}
      />
      <ambientLight {...{ intensity: 0.15 }} />
      <hemisphereLight {...{ args: [skyColor, groundColor, 0.05] }} />
    </>
  );
};
