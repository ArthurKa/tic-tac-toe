import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE, TOUCH } from 'three';
import styled from 'styled-components';
import { StylesReset } from './style-reset';
import { DevHelpers, Game, Lights } from './components';
import { skyColor } from './constants';
import { NODE_ENV } from './envVariables';

const StyledCanvas = styled(Canvas)`
  height: 100vh !important;
  background-color: ${skyColor};
`;

export const App: React.FC = () => {
  return (
    <>
      <StylesReset />
      <StyledCanvas {...{
        shadows: true,
        camera: { position: [5, 20, 10], zoom: 2 },
      }}
      >
        <DevHelpers />
        <OrbitControls {...{
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
        <Lights />
        <Game />
      </StyledCanvas>
    </>
  );
};
