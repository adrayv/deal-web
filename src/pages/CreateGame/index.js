import React, { useState, useCallback } from 'react';
import View from './view';
import { navigate } from '@reach/router';
import { createGame } from 'services/game';
import { storeSaveToken } from 'services/save-token';

export default () => {
  const [name, setName] = useState('');

  const canCreateGame = Boolean(name);

  const createGameHandler = useCallback(async () => {
    try {
      if (canCreateGame) {
        const { gameId, playerId } = await createGame(name);
        storeSaveToken(gameId, playerId);
        setName('');
        navigate(`/games/${gameId}`);
      }
    } catch (err) {
      console.error('ISSUE CREATING GAME', err);
      alert('Issue creating game');
    }
  }, [canCreateGame, name]);

  return (
    <View
      onNameChange={setName}
      name={name}
      onCreateGame={createGameHandler}
      canCreateGame={canCreateGame}
    />
  );
};
