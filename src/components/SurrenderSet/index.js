import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const {
    getMainPlayerOpenTask,
    playerId,
    getMainPlayerSets,
    getPlayerById,
  } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const submitHandler = useCallback(() => {
    pushAction(actionCreators.resolveSurrenderSet(playerId));
  }, [playerId, pushAction]);

  if (task && task.type === taskTypes.surrenderSet) {
    const attacker = getPlayerById(task.from);
    const { setToSurrenderIndex } = task.payload;
    const setToSurrender = getMainPlayerSets()[setToSurrenderIndex];
    return (
      <View
        setToSurrender={setToSurrender}
        attackerName={attacker.name}
        onConfirm={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
