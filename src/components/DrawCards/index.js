import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const { getMainPlayerOpenTask, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const clickHandler = useCallback(() => {
    pushAction(actionCreators.resolveDrawCards(playerId));
  }, [pushAction, playerId]);

  if (task && task.type === taskTypes.drawCards) {
    const numCardsToDraw = task.payload.numCardsToDraw;
    return <View onClick={clickHandler} numCardsToDraw={numCardsToDraw} />;
  }
  return <React.Fragment />;
};
