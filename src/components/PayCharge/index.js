import React, { useState, useCallback } from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';
import usePushAction from 'hooks/usePushAction';
import { actionCreators, taskTypes } from 'game/core';

export default () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const {
    getMainPlayerOpenTask,
    getMainPlayerCashAndProperties,
    mainPlayerCanSayNo,
    playerId,
    getPlayerById,
  } = useGameState();
  const task = getMainPlayerOpenTask();
  const { pushAction } = usePushAction();

  /* test rerendering/memoization here */
  const canSayNo = mainPlayerCanSayNo();

  const mainPlayerCashAndProperties = getMainPlayerCashAndProperties();

  const runningTotal = selectedCards
    .map(cardId => mainPlayerCashAndProperties.find(card => card.id === cardId))
    .filter(c => c)
    .reduce((total, card) => {
      return total + card.value;
    }, 0);

  const submitHandler = useCallback(() => {
    if (
      task &&
      task.type === taskTypes.payCharge &&
      runningTotal >= task.payload.amount
    ) {
      const cardsToSurrender = selectedCards.map(cardId =>
        mainPlayerCashAndProperties.find(card => card.id === cardId)
      );
      pushAction(actionCreators.resolveCharge(playerId, cardsToSurrender));
    }
  }, [
    playerId,
    pushAction,
    runningTotal,
    selectedCards,
    task,
    mainPlayerCashAndProperties,
  ]);

  const sayNoHandler = useCallback(() => {
    if (canSayNo) {
      pushAction(actionCreators.sayNo(playerId));
    }
  }, [pushAction, playerId, canSayNo]);

  const goBankruptHandler = useCallback(() => {
    pushAction(actionCreators.goBankrupt(playerId));
  }, [pushAction, playerId]);

  if (task && task.type === taskTypes.payCharge) {
    const attacker = getPlayerById(task.from);
    const { amount } = task.payload;
    return (
      <View
        amountOwed={amount}
        attackerName={attacker.name}
        onGoBankrupt={goBankruptHandler}
        canSayNo={canSayNo}
        onSayNo={sayNoHandler}
        cards={mainPlayerCashAndProperties}
        selectedCards={selectedCards}
        onCardSelect={setSelectedCards}
        canSubmit={runningTotal >= amount}
        onSubmit={submitHandler}
        runningTotal={runningTotal}
      />
    );
  }
  return <React.Fragment />;
};
