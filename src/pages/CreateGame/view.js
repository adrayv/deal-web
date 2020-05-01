import React from 'react';

export default ({ name, onNameChange, canCreateGame, onCreateGame }) => (
  <React.Fragment>
    <h1>Create a Game</h1>
    <input
      value={name}
      onChange={e => onNameChange(e.target.value)}
      placeholder="please enter your name"
    />
    {canCreateGame && <button onClick={onCreateGame}>Create Game</button>}
  </React.Fragment>
);
