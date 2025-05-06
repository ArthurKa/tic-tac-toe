import { Canvas } from '@react-three/fiber';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { StylesReset } from './style-reset';
import { DevHelpers, Game, Lights, OrbitControls } from './components';
import { skyColor } from './constants';
import { connectSocketHandlers, useMouseMove } from './services';

const GlobalStyles = createGlobalStyle`
  #root {
    position: relative;
    overflow: hidden;
  }
`;

const StyledCanvas = styled(Canvas)`
  height: 100vh !important;
  background-color: ${skyColor};
`;

export const App: React.FC = () => {
  useEffect(connectSocketHandlers, []);
  useMouseMove();

  return (
    <>
      <StylesReset />
      <GlobalStyles />
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
