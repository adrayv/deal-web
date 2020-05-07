import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { mainPlayerHasAnOpenTask } = useGameState();
  if (mainPlayerHasAnOpenTask()) {
    return <View />;
  }
  return <React.Fragment />;
};
