import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { getMainPlayerOpenTask, getOtherPlayers, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const otherPlayers = getOtherPlayers();

  const submitHandler = useCallback(() => {
    if (selectedPlayer) {
      pushAction(
        actionCreators.resolveSelectPlayerToCharge(playerId, selectedPlayer)
      );
    }
  }, [playerId, selectedPlayer, pushAction]);

  if (task && task.type === taskTypes.selectPlayerToCharge) {
    return (
      <View
        players={otherPlayers}
        selectedPlayer={selectedPlayer}
        onPlayerSelect={setSelectedPlayer}
        canSubmit={Boolean(selectedPlayer)}
        onSubmit={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
