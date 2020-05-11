import React, { useCallback, useState } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const { getMainPlayerOpenTask, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const submitHandler = useCallback(() => {
    if (selectedColor) {
      pushAction(
        actionCreators.resolveSelectColorToRent(playerId, selectedColor)
      );
    }
  }, [playerId, selectedColor, pushAction]);

  if (task && task.type === taskTypes.selectColorToRent) {
    return (
      <View
        canSubmit={Boolean(selectedColor)}
        onSubmit={submitHandler}
        colors={task.payload.availableColors}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />
    );
  }
  return <React.Fragment />;
};
