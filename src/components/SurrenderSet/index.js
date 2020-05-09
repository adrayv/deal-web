import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const {
    getMainPlayerOpenTask,
    playerId,
    mainPlayerCanSayNo,
    getMainPlayerSets,
    getPlayerById,
  } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  /* test rerendering/memoization here */
  const canSayNo = mainPlayerCanSayNo();

  const sayNoHandler = useCallback(() => {
    if (canSayNo) {
      pushAction(actionCreators.sayNo(playerId));
    }
  }, [pushAction, playerId, canSayNo]);

  const submitHandler = useCallback(() => {
    pushAction(actionCreators.resolveSurrenderSet(playerId));
  }, [playerId, pushAction]);

  if (task && task.type === taskTypes.surrenderSet) {
    const attacker = getPlayerById(task.from);
    const { setToSurrenderIndex } = task.payload;
    const setToSurrender = getMainPlayerSets()[setToSurrenderIndex];
    return (
      <View
        onSayNo={sayNoHandler}
        canSayNo={canSayNo}
        setToSurrender={setToSurrender}
        attackerName={attacker.name}
        onConfirm={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
