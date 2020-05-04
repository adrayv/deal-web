import React from 'react';
import View from './view';
import useGameState from 'hooks/useGameState';

export default ({ playerId }) => {
  const { getPlayerById } = useGameState();
  const player = getPlayerById(playerId);
  if (player) {
    const { name } = player;
    return (
      <View
        playerName={name}
        onClick={() => alert(`clicked on player: ${name}`)}
      />
    );
  }
  return <React.Fragment />;
};
