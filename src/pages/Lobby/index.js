import React, { useCallback } from 'react';
import View from './view';

export default ({ gameId }) => {
  const canStartGame = true;

  const startGameHandler = useCallback(() => {
    if (canStartGame) {
      alert('starting game');
    }
  }, [canStartGame]);

  return (
    <View
      onStartGame={startGameHandler}
      canStartGame={canStartGame}
      gameId={gameId}
    />
  );
};
