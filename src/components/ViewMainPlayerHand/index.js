import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { getMainPlayerHand } = useGameState();
  const mainPlayerHand = getMainPlayerHand();
  if (mainPlayerHand) {
    return <View cards={mainPlayerHand} />;
  }
  return <React.Fragment />;
};
