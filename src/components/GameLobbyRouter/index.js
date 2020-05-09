import React from 'react';
import Game from 'pages/Game';
import Lobby from 'pages/Lobby';
import useGameState from 'hooks/useGameState';
import Endgame from 'pages/Endgame';

export default ({ gameId }) => {
  const { gameHasStarted, gameHasEnded } = useGameState();
  if (gameHasStarted()) {
    return <Game />;
  } else if (gameHasEnded()) {
    return <Endgame />;
  } else {
    return <Lobby gameId={gameId} />;
  }
  // <Error Accessing this Game/>
};
