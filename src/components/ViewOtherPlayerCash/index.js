import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default ({ playerId }) => {
  const { getOtherPlayerCash, getOtherPlayerName } = useGameState();
  const otherPlayerCash = getOtherPlayerCash(playerId);
  const otherPlayerName = getOtherPlayerName(playerId);
  if (otherPlayerName && otherPlayerCash) {
    return (
      <View
        numCashCards={otherPlayerCash.length}
        playerName={otherPlayerName}
      />
    );
  }
  return <React.Fragment />;
};
