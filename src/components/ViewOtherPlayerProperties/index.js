import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default ({ playerId }) => {
  const { getOtherPlayerName, getOtherPlayerSets } = useGameState();
  const otherPlayerName = getOtherPlayerName(playerId);
  const otherPlayerSets = getOtherPlayerSets(playerId);
  if (otherPlayerName && otherPlayerSets) {
    return <View playerName={otherPlayerName} playerSets={otherPlayerSets} />;
  }
  return <React.Fragment />;
};
