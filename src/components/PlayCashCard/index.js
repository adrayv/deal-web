import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators } from 'game/core';
import useModal from 'hooks/useModal';

export default () => {
  const [selectedCashCardId, setSelected] = useState(null);
  const { getMainPlayerCashInHand, playerId } = useGameState();
  const mainPlayerCashInHand = getMainPlayerCashInHand();
  const { pushAction } = usePushAction();
  const { removeComponent } = useModal();

  const selectCardHandler = useCallback(cardId => {
    setSelected(cardId);
  }, []);

  const submitHandler = useCallback(() => {
    const cardToPlay = mainPlayerCashInHand.find(
      card => card.id === selectedCashCardId
    );
    if (cardToPlay) {
      pushAction(actionCreators.playCard(playerId, cardToPlay));
      removeComponent();
    }
  }, [
    selectedCashCardId,
    mainPlayerCashInHand,
    playerId,
    pushAction,
    removeComponent,
  ]);

  if (mainPlayerCashInHand) {
    return (
      <View
        cards={mainPlayerCashInHand}
        selectedCashCardId={selectedCashCardId}
        onSelectCard={selectCardHandler}
        canSubmit={Boolean(selectedCashCardId)}
        onSubmit={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
