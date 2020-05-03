import React, { useEffect } from 'react';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { reducer } from 'game/core';
import { pushGameState } from 'services/game';

export default () => {
  const { state, gameId } = useGameState();
  const { lastPushedAction, removeAction } = usePushAction();

  useEffect(() => {
    if (lastPushedAction && gameId) {
      const newState = reducer(state, lastPushedAction);
      removeAction();
      pushGameState(gameId, newState);
    }
  }, [lastPushedAction, removeAction, state, gameId]);

  return <React.Fragment />;
};
