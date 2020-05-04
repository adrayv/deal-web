import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default () => {
  const { getMainPlayer } = useGameState();
  const mainPlayer = getMainPlayer();
  if (mainPlayer) {
    const { name } = mainPlayer;
    return (
      <View
        onEndTurn={() => alert(`${name} wants to end their turn`)}
        onPlayCash={() => alert(`${name} wants to play cash`)}
        onPlayProperty={() => alert(`${name} wants to play property`)}
        onViewCash={() => alert(`${name} wants to view their cash`)}
        onViewHand={() => alert(`${name} wants to view their hand`)}
        onViewProperties={() => alert(`${name} wants to view their properties`)}
      />
    );
  }
  return <React.Fragment />;
};
