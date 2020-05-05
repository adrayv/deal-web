import React, { useEffect, useState } from 'react';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { reducer } from 'game/core';
import { pushGameState } from 'services/game';

export default () => {
  const [prevActionId, setPrevActionId] = useState(null);
  const { state, gameId } = useGameState();
  const { lastPushedAction } = usePushAction();

  useEffect(() => {
    if (lastPushedAction && lastPushedAction.id !== prevActionId) {
      const newState = reducer(state, lastPushedAction);
      setPrevActionId(lastPushedAction.id);
      pushGameState(gameId, newState);
    }
  }, [lastPushedAction, state, gameId, prevActionId]);

  return <React.Fragment />;
};
