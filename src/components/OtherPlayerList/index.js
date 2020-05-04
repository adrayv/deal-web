import React from 'react';
import useGameState from 'hooks/useGameState';
import View from './view';

export default () => {
  const { getOtherPlayerIds } = useGameState();
  const otherPlayerIds = getOtherPlayerIds();
  if (otherPlayerIds) {
    return <View playerIds={otherPlayerIds} />;
  }
  return <React.Fragment />;
};
