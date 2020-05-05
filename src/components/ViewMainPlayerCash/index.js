import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { getMainPlayerCash } = useGameState();
  const mainPlayerCash = getMainPlayerCash();
  if (mainPlayerCash) {
    return <View cards={mainPlayerCash} />;
  }
  return <React.Fragment />;
};
