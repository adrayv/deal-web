import React from 'react';
import { LocationProvider } from '@reach/router';
import { GameStateProvider } from 'hooks/useGameState';
import { PushedActionsProvider } from 'hooks/usePushAction';

export default ({ children }) => (
  <LocationProvider>
    <PushedActionsProvider>
      <GameStateProvider>{children}</GameStateProvider>
    </PushedActionsProvider>
  </LocationProvider>
);
