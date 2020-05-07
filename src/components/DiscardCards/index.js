import React, { useCallback, useState } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const { getMainPlayerOpenTask, getMainPlayerHand, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const mainPlayerHand = getMainPlayerHand();

  const submitHandler = useCallback(() => {
    const cardsToDiscard = selectedCards.map(cardId =>
      mainPlayerHand.find(card => card.id === cardId)
    );
    pushAction(actionCreators.resolveDiscardCards(playerId, cardsToDiscard));
  }, [pushAction, playerId, mainPlayerHand, selectedCards]);

  if (task && task.type === taskTypes.discardCards && mainPlayerHand) {
    const numCardsToDiscard = task.payload.numCardsToDiscard;
    return (
      <View
        numCardsToDiscard={numCardsToDiscard}
        cards={mainPlayerHand}
        onCardSelect={setSelectedCards}
        selectedCards={selectedCards}
        canSubmit={selectedCards.length === numCardsToDiscard}
        onSubmit={submitHandler}
      />
    );
  }
  return <React.Fragment />;
};
