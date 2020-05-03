import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import { actionCreators } from 'game/core';
import usePushAction from 'hooks/usePushAction';

export default ({ gameId }) => {
  const { canStartGame } = useGameState();
  const { pushAction } = usePushAction();

  const startGameHandler = useCallback(() => {
    if (canStartGame()) {
      pushAction(actionCreators.startGame());
    }
  }, [canStartGame, pushAction]);

  return (
    <View
      onStartGame={startGameHandler}
      canStartGame={canStartGame}
      gameId={gameId}
    />
  );
};
