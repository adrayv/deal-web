import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { isMainPlayersTurn } = useGameState();
  return <View canInteract={isMainPlayersTurn()} />;
};
