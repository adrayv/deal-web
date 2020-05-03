import React from 'react';
import useGameState from 'hooks/useGameState';

export default ({ gameId }) => {
  const { getPlayers } = useGameState();
  const players = getPlayers();
  if (players) {
    return (
      <>
        <h1>Player List from Game: {gameId}</h1>
        {players.map(player => (
          <div>
            <p>id: {player.id}</p>
            <p>name: {player.name}</p>
          </div>
        ))}
      </>
    );
  }
  return <React.Fragment />;
};
