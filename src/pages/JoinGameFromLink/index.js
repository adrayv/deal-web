import React, { useEffect, useState, useCallback } from 'react';
import { getSaveToken, storeSaveToken } from 'services/save-token';
import { navigate } from '@reach/router';
import View from './view';
import { joinGame } from 'services/game';

export default ({ gameId }) => {
  const [name, setName] = useState('');
  const canJoinGame = Boolean(name);

  useEffect(() => {
    const saveToken = getSaveToken();
    if (saveToken && saveToken.gameId === gameId) {
      navigate(`/games/${gameId}`);
    }
  }, [gameId]);

  const joinGameHandler = useCallback(async () => {
    try {
      if (canJoinGame) {
        const { playerId } = await joinGame(gameId, name);
        storeSaveToken(gameId, playerId);
        setName('');
        navigate(`/games/${gameId}`);
      }
    } catch (err) {
      console.error('ERROR JOINING GAME', err);
      alert('Issue joining game');
    }
  }, [name, canJoinGame, gameId]);

  return (
    <View
      value={name}
      onNameChange={setName}
      canJoinGame={canJoinGame}
      onJoinGame={joinGameHandler}
    />
  );
};
