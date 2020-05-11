import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { getMainPlayerOpenTask, getOtherPlayers, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const otherPlayers = getOtherPlayers();

  const submitHandler = useCallback(() => {
    if (selectedPlayer && selectedColor) {
      pushAction(
        actionCreators.resolveSelectPlayerAndColorToRent(
          playerId,
          selectedPlayer,
          selectedColor
        )
      );
    }
  }, [playerId, selectedPlayer, selectedColor, pushAction]);

  if (task && task.type === taskTypes.selectPlayerAndColorToRent) {
    return (
      <View
        players={otherPlayers}
        selectedPlayer={selectedPlayer}
        onPlayerSelect={setSelectedPlayer}
        colors={task.payload.availableColors}
        onColorSelect={setSelectedColor}
        selectedColor={selectedColor}
        canSubmit={Boolean(selectedPlayer && selectedColor)}
        onSubmit={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
