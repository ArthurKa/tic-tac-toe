import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { useEffect } from 'react';
import { StylesReset } from './style-reset';
import { DevHelpers, Game, Lights, OrbitControls } from './components';
import { skyColor } from './constants';
import { connectSocketHandlers } from './services';

const StyledCanvas = styled(Canvas)`
  height: 100vh !important;
  background-color: ${skyColor};
`;

export const App: React.FC = () => {
  useEffect(connectSocketHandlers, []);

  return (
    <>
      <StylesReset />
      <StyledCanvas {...{
        shadows: true,
        camera: { position: [5, 20, 10], zoom: 2 },
      }}
      >
        <DevHelpers />
        <OrbitControls />
        <Lights />
        <Game />
      </StyledCanvas>
    </>
  );
};
