import React from 'react';
import Game from 'pages/Game';
import Lobby from 'pages/Lobby';
import useTempState from 'hooks/useTempState';

export default ({ gameId }) => {
  const { gameStarted } = useTempState();
  if (gameStarted) {
    return <Game gameId={gameId} />;
  } else {
    return <Lobby gameId={gameId} />;
  }
};
