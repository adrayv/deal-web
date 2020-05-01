import React from 'react';
import { Router } from '@reach/router';
import Home from 'pages/Home';
import GameRules from 'pages/GameRules';
import JoinGameInfo from 'pages/JoinGameInfo';
import CreateGame from 'pages/CreateGame';

function App() {
  return (
    <Router>
      <Home path="/" />
      <GameRules path="/rules" />
      <JoinGameInfo path="join-info" />
      <CreateGame path="/create" />
    </Router>
  );
}

export default App;
