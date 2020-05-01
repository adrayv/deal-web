import React from 'react';

export default ({ name, onNameChange, canJoinGame, onJoinGame }) => {
  return (
    <>
      <h1>Join Game</h1>
      <input value={name} onChange={e => onNameChange(e.target.value)} />
      {canJoinGame && <button onClick={onJoinGame}>Join Game</button>}
    </>
  );
};
