import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import { MOUSE, TOUCH } from 'three';
import { NODE_ENV } from '../envVariables';

export const OrbitControls: React.FC = () => (
  <DreiOrbitControls {...{
    ...NODE_ENV !== 'development' && {
      maxPolarAngle: Math.PI / 2.01,
    },
    mouseButtons: {
      RIGHT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
    },
    touches: {
      TWO: TOUCH.DOLLY_ROTATE,
    },
  }}
  />
);
