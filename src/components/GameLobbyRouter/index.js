import React from 'react';
import Game from 'pages/Game';
import Lobby from 'pages/Lobby';
import useGameState from 'hooks/useGameState';

export default ({ gameId }) => {
  const { gameHasStarted } = useGameState();
  if (gameHasStarted()) {
    return <Game gameId={gameId} />;
  } else {
    return <Lobby gameId={gameId} />;
  }
  // <Error Accessing this Game/>
};
