import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators } from 'game/core';
import useModal from 'hooks/useModal';

export default () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const { playerId, getMainPlayerActionsInHand } = useGameState();
  const mainPlayerHandActions = getMainPlayerActionsInHand();
  const { pushAction } = usePushAction();
  const { removeComponent } = useModal();

  const submitHandler = useCallback(() => {
    const cardToPlay = mainPlayerHandActions.find(
      actionCard => actionCard.id === selectedAction
    );
    if (cardToPlay) {
      pushAction(actionCreators.playCard(playerId, cardToPlay));
      removeComponent();
    }
  }, [
    selectedAction,
    mainPlayerHandActions,
    playerId,
    pushAction,
    removeComponent,
  ]);

  if (mainPlayerHandActions) {
    return (
      <View
        actionCards={mainPlayerHandActions}
        selectedActionCard={selectedAction}
        onSelectAction={setSelectedAction}
        canSubmit={Boolean(selectedAction)}
        onSubmit={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
