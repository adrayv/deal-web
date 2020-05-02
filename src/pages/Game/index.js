import React from 'react';
import useGameState from 'hooks/useGameState';

export default ({ gameId }) => {
  const { state } = useGameState();
  return (
    <>
      <h1>Game ID: {gameId}</h1>
      <p>{JSON.stringify(state)}</p>
    </>
  );
};
