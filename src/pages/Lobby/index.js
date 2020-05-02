import React, { useCallback } from 'react';
import View from './view';
import { startGame } from 'services/game';

export default ({ gameId }) => {
  const canStartGame = true;

  const startGameHandler = useCallback(() => {
    if (canStartGame) {
      startGame(gameId);
    }
  }, [canStartGame, gameId]);

  return (
    <View
      onStartGame={startGameHandler}
      canStartGame={canStartGame}
      gameId={gameId}
    />
  );
};
