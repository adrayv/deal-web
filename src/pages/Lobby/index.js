import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import { gameStatuses, reducer, actionCreators } from 'game/core';
import { pushGameState } from 'services/game';

export default ({ gameId }) => {
  const { state } = useGameState();

  const canStartGame = state && state.status === gameStatuses.ready;

  const startGameHandler = useCallback(() => {
    if (canStartGame) {
      const newState = reducer(state, actionCreators.startGame());
      pushGameState(gameId, newState);
    }
  }, [canStartGame, state, gameId]);

  return (
    <View
      onStartGame={startGameHandler}
      canStartGame={canStartGame}
      gameId={gameId}
    />
  );
};
