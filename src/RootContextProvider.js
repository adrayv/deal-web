import React from 'react';
import { LocationProvider } from '@reach/router';
import { GameStateProvider } from 'hooks/useGameState';
import { PushedActionsProvider } from 'hooks/usePushAction';
import { ModalProvider } from 'hooks/useModal';
import { GameMessageProvider } from 'hooks/useGameMessages';

export default ({ children }) => (
  <LocationProvider>
    <PushedActionsProvider>
      <GameStateProvider>
        <GameMessageProvider>
          <ModalProvider>{children}</ModalProvider>
        </GameMessageProvider>
      </GameStateProvider>
    </PushedActionsProvider>
  </LocationProvider>
);
