import React, { useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const {
    getMainPlayerOpenTask,
    mainPlayerCanSayNo,
    playerId,
    getPlayerById,
  } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  /* test rerendering/memoization here */
  const canSayNo = mainPlayerCanSayNo();

  const submitHandler = useCallback(() => {
    pushAction(actionCreators.resolveSurrenderCard(playerId));
  }, [playerId, pushAction]);

  const sayNoHandler = useCallback(() => {
    if (canSayNo) {
      pushAction(actionCreators.sayNo(playerId));
    }
  }, [pushAction, playerId, canSayNo]);

  if (task && task.type === taskTypes.surrenderCard) {
    const attacker = getPlayerById(task.from);
    const { cardToSurrender } = task.payload;
    return (
      <View
        onSayNo={sayNoHandler}
        canSayNo={canSayNo}
        cardToSurrender={cardToSurrender}
        attackerName={attacker.name}
        onConfirm={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
