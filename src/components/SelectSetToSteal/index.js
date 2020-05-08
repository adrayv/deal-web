import React, { useCallback, useState } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedSet, setSelectedSet] = useState(null);
  const {
    getMainPlayerOpenTask,
    getSetsToSteal,
    getPlayerById,
    playerId,
  } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const setsToSteal = getSetsToSteal();

  const submitHandler = useCallback(() => {
    const setToSteal = setsToSteal.find(set => set.id === selectedSet);
    const playerToStealFrom = getPlayerById(setToSteal.owner.id);
    const setToStealIndex = playerToStealFrom.sets.findIndex(
      set => set.color === setToSteal.color
    );
    pushAction(
      actionCreators.resolveSelectSetToSteal(
        playerId,
        setToSteal.owner.id,
        setToStealIndex
      )
    );
  }, [setsToSteal, selectedSet, getPlayerById, playerId, pushAction]);

  if (task && task.type === taskTypes.selectSetToSteal && setsToSteal) {
    return (
      <View
        canSubmit={Boolean(selectedSet)}
        onSubmit={submitHandler}
        sets={setsToSteal}
        selectedSet={selectedSet}
        onSetSelect={setSelectedSet}
      />
    );
  }
  return <React.Fragment />;
};
