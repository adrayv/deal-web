import React from 'react';
import { LocationProvider } from '@reach/router';
import { GameStateProvider } from 'hooks/useGameState';
import { PushedActionsProvider } from 'hooks/usePushAction';
import { ModalProvider } from 'hooks/useModal';

export default ({ children }) => (
  <LocationProvider>
    <PushedActionsProvider>
      <GameStateProvider>
        <ModalProvider>{children}</ModalProvider>
      </GameStateProvider>
    </PushedActionsProvider>
  </LocationProvider>
);
