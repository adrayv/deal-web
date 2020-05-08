import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const { getMainPlayerOpenTask, playerId, getPlayerById } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const submitHandler = useCallback(() => {
    pushAction(actionCreators.resolveSurrenderCard(playerId));
  }, [playerId, pushAction]);

  if (task && task.type === taskTypes.surrenderCard) {
    const attacker = getPlayerById(task.from);
    const { cardToSurrender } = task.payload;
    return (
      <View
        cardToSurrender={cardToSurrender}
        attackerName={attacker.name}
        onConfirm={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
