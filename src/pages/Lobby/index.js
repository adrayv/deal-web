import React, { useCallback } from 'react';
import View from './view';
import useTempState from 'hooks/useTempState';

export default ({ gameId }) => {
  const canStartGame = true;

  const { setGameStarted } = useTempState();

  const startGameHandler = useCallback(() => {
    if (canStartGame) {
      alert('starting game');
      setGameStarted(true);
    }
  }, [canStartGame, setGameStarted]);

  return (
    <View
      onStartGame={startGameHandler}
      canStartGame={canStartGame}
      gameId={gameId}
    />
  );
};
