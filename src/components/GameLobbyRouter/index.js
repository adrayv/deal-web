import React from 'react';
import Game from 'pages/Game';
import Lobby from 'pages/Lobby';
import useGameState from 'hooks/useGameState';
import { gameStatuses } from 'game/core';

export default ({ gameId }) => {
  const { state } = useGameState();
  if (state && state.status === gameStatuses.inProgress) {
    return <Game gameId={gameId} />;
  } else {
    return <Lobby gameId={gameId} />;
  }
  // <Error Accessing this Game/>
};
