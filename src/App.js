import React from 'react';
import { Router } from '@reach/router';
import Home from 'pages/Home';
import GameRules from 'pages/GameRules';
import JoinGameInfo from 'pages/JoinGameInfo';
import CreateGame from 'pages/CreateGame';
import GameLobbyRouter from 'components/GameLobbyRouter';
import RootContextProvider from 'RootContextProvider';
import RootEffects from 'RootEffects';
import JoinGameFromLink from 'pages/JoinGameFromLink';
import GlobalModal from 'components/GlobalModal';

function App() {
  return (
    <RootContextProvider>
      <Router>
        <Home path="/" />
        <GameRules path="/rules" />
        <JoinGameInfo path="join-info" />
        <CreateGame path="/create" />
        <GameLobbyRouter path="/games/:gameId" />
        <JoinGameFromLink path="/join-game/:gameId" />
      </Router>
      <RootEffects />
      <GlobalModal />
    </RootContextProvider>
  );
}

export default App;
