import React from 'react';
import useGameState from 'hooks/useGameState';

export default ({ gameId }) => {
  const { state } = useGameState();
  return (
    <>
      <h1>Player List from Game: {gameId}</h1>
      {state &&
        state.players &&
        Object.values(state.players).map(player => (
          <div>
            <p>id: {player.id}</p>
            <p>name: {player.name}</p>
          </div>
        ))}
    </>
  );
};
