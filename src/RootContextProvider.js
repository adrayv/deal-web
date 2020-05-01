import React from 'react';
import { LocationProvider } from '@reach/router';
import { GameStateProvider } from 'hooks/useGameState';

export default ({ children }) => (
  <LocationProvider>
    <GameStateProvider>{children}</GameStateProvider>
  </LocationProvider>
);
