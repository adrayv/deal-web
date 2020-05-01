import React from 'react';
import PlayerList from 'components/PlayerList';
import GameLink from 'components/GameLink';

export default ({ gameId, onStartGame, canStartGame }) => (
  <>
    <PlayerList gameId={gameId} />
    <GameLink gameId={gameId} />
    {canStartGame && <button onClick={onStartGame}>Start Game</button>}
  </>
);
