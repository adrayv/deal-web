import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { getMainPlayerSets } = useGameState();
  const mainPlayerSets = getMainPlayerSets();
  if (mainPlayerSets) {
    return <View sets={mainPlayerSets} />;
  }
  return <React.Fragment />;
};
