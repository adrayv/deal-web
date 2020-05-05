import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default ({ playerId }) => {
  const { getOtherPlayerHand, getOtherPlayerName } = useGameState();
  const otherPlayerHand = getOtherPlayerHand(playerId);
  const otherPlayerName = getOtherPlayerName(playerId);
  if (otherPlayerHand && otherPlayerName) {
    return (
      <View numCards={otherPlayerHand.length} playerName={otherPlayerName} />
    );
  }
  return <React.Fragment />;
};
