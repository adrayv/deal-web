import React, { useState, useCallback } from 'react';
import View from './view';
import { navigate } from '@reach/router';
import { createGame } from 'services/game';
import { storeSaveToken } from 'services/save-token';
import { Player } from 'game/entities';
import { createInitialGameState } from 'game/core';

export default () => {
  const [name, setName] = useState('');

  const canCreateGame = Boolean(name);

  const createGameHandler = useCallback(async () => {
    try {
      if (canCreateGame) {
        const initialPlayer = Player(name);
        const initialState = createInitialGameState(initialPlayer);
        const gameId = await createGame(initialState);
        storeSaveToken(gameId, initialPlayer.id);
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
