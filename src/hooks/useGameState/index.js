import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import db from 'services/firebase/firestore';
import { useMatch, navigate } from '@reach/router';
import { getSaveToken } from 'services/save-token';
import { gameStatuses } from 'game/core';

const Context = createContext();

const { Provider } = Context;

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const match = useMatch('/games/:gameId');
  const gameId = match && match.gameId;
  const gameStatus = gameState && gameState.status;
  const players =
    gameState && gameState.order.map(pid => gameState.players[pid]);

  useEffect(() => {
    if (gameId) {
      const saveToken = getSaveToken();
      if (saveToken && saveToken.playerId && saveToken.gameId === gameId) {
        setPlayerId(saveToken.playerId);
        return db
          .collection('games')
          .doc(gameId)
          .onSnapshot(
            doc => {
              const state = doc.data();
              if (state && state.players[saveToken.playerId]) {
                setPlayerId(saveToken.playerId);
                setGameState(doc.data());
              } else {
                alert('There was an issue joining this game');
                navigate('/');
              }
            },
            err => {
              console.error('ISSUE JOINING GAME', err);
              alert('Issue joining this game');
              navigate('/');
            }
          );
      } else {
        navigate(`/join-game/${gameId}`);
      }
    }
  }, [gameId]);

  const getGameStatus = useCallback(() => gameStatus, [gameStatus]);
  const getPlayers = useCallback(() => players, [players]);
  const canStartGame = useCallback(() => gameStatus === gameStatuses.ready, [
    gameStatus,
  ]);
  const gameHasStarted = useCallback(
    () => gameStatus === gameStatuses.inProgress,
    [gameStatus]
  );

  return (
    <Provider
      value={{
        playerId,
        gameId,
        state: gameState,
        getGameStatus,
        getPlayers,
        canStartGame,
        gameHasStarted,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
