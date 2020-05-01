import React from 'react';

export default ({ onCreateGame, onJoinGame, onRulesClick }) => (
  <React.Fragment>
    <h1>home</h1>
    <button onClick={onCreateGame}>Create Game</button>
    <button onClick={onJoinGame}>Join Game</button>
    <button onClick={onRulesClick}>Rules</button>
  </React.Fragment>
);
