import React, { useCallback, useState } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const { getMainPlayerOpenTask, getCardsToSteal, playerId } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  const cardsToSteal = getCardsToSteal();

  const submitHandler = useCallback(() => {
    const cardToSteal = cardsToSteal.find(card => card.id === selectedCard);
    pushAction(
      actionCreators.resolveSelectCardToSteal(
        playerId,
        cardToSteal.owner.id,
        cardToSteal
      )
    );
  }, [playerId, selectedCard, cardsToSteal, pushAction]);

  if (task && task.type === taskTypes.selectCardToSteal && cardsToSteal) {
    return (
      <View
        canSubmit={Boolean(selectedCard)}
        onSubmit={submitHandler}
        cards={cardsToSteal}
        selectedCard={selectedCard}
        onCardSelect={setSelectedCard}
      />
    );
  }
  return <React.Fragment />;
};
