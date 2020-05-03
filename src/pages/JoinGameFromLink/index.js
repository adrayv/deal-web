import React, { useEffect, useState, useCallback } from 'react';
import { getSaveToken, storeSaveToken } from 'services/save-token';
import { navigate } from '@reach/router';
import View from './view';
import { getGameById, pushGameState } from 'services/game';
import { Player } from 'game/entities';
import { canJoinGame, actionCreators, reducer } from 'game/core';

export default ({ gameId }) => {
  const [name, setName] = useState('');
  const canSubmit = Boolean(name);

  useEffect(() => {
    const saveToken = getSaveToken();
    if (saveToken && saveToken.gameId === gameId) {
      navigate(`/games/${gameId}`);
    }
  }, [gameId]);

  const joinGameHandler = useCallback(async () => {
    try {
      if (canSubmit) {
        setName('');
        const player = Player(name);
        const gameToJoin = await getGameById(gameId);
        if (canJoinGame(gameToJoin)) {
          const newGameState = reducer(
            gameToJoin,
            actionCreators.joinGame(player)
          );
          await pushGameState(gameId, newGameState);
          storeSaveToken(gameId, player.id);
          setTimeout(() => {
            navigate(`/games/${gameId}`);
          }, 1000);
        } else {
          throw new Error('Cannot join game');
        }
      }
    } catch (err) {
      console.error('ERROR JOINING GAME', err);
      alert('Issue joining game');
    }
  }, [name, canSubmit, gameId]);

  return (
    <View
      value={name}
      onNameChange={setName}
      canJoinGame={canSubmit}
      onJoinGame={joinGameHandler}
    />
  );
};
