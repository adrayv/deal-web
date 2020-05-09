import React from 'react';
import useGameState from 'hooks/useGameState';
import View from './view';

export default () => {
  const { getGameWinner, getPlayerById } = useGameState();
  const winnerId = getGameWinner();
  const winner = getPlayerById(winnerId);
  if (winner) {
    return <View winnerName={winner.name} />;
  }
  return <React.Fragment />;
};
