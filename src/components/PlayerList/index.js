import React from 'react';
import useGameState from 'hooks/useGameState';

export default ({ gameId }) => {
  const { state } = useGameState();
  return (
    <>
      {state && state.players && (
        <>
          <h1>Player List from Game: {gameId}</h1>
          {Object.values(state.players).map(player => (
            <div>
              <p>id: {player.id}</p>
              <p>name: {player.name}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
