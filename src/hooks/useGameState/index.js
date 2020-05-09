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

  const gameStatus = gameState && gameState.status;
  const gameWinner = gameState && gameState.winner;
  const players =
    gameState && gameState.order.map(pid => gameState.players[pid]);
  const playersObj = gameState && gameState.players;
  const otherPlayerIds =
    gameState &&
    gameState.order &&
    playerId &&
    gameState.order.filter(pid => pid !== playerId);
  const otherPlayers =
    playersObj && otherPlayerIds && otherPlayerIds.map(id => playersObj[id]);
  const mainPlayer = gameState && playerId && gameState.players[playerId];
  const mainPlayerId = mainPlayer && mainPlayer.id;
  const mainPlayerName = mainPlayer && mainPlayer.name;
  const mainPlayerHand = mainPlayer && mainPlayer.hand;
  const mainPlayerCash = mainPlayer && mainPlayer.cash;
  const mainPlayerHandCash =
    mainPlayerHand && mainPlayerHand.filter(card => card.type === 'cash');
  const mainPlayerHandProperties =
    mainPlayerHand && mainPlayerHand.filter(card => card.type === 'property');
  const mainPlayerHandActions =
    mainPlayerHand && mainPlayerHand.filter(card => card.type === 'action');
  const mainPlayerSets = mainPlayer && mainPlayer.sets;
  const currentPlayer = gameState && gameState.order[gameState.turn];
  const numTasks = gameState && gameState.tasks && gameState.tasks.length;
  const nextTask =
    gameState && gameState.tasks && gameState.tasks[gameState.tasks.length - 1];

  const getGameStatus = useCallback(() => gameStatus, [gameStatus]);
  const getPlayers = useCallback(() => players, [players]);
  const canStartGame = useCallback(() => gameStatus === gameStatuses.ready, [
    gameStatus,
  ]);
  const gameHasStarted = useCallback(
    () => gameStatus === gameStatuses.inProgress,
    [gameStatus]
  );
  const gameHasEnded = useCallback(() => gameStatus === gameStatuses.done, [
    gameStatus,
  ]);
  const getGameWinner = useCallback(() => gameWinner, [gameWinner]);
  const getOtherPlayerIds = useCallback(() => otherPlayerIds, [otherPlayerIds]);
  const getOtherPlayerCash = useCallback(
    pid => playersObj && playersObj[pid] && playersObj[pid].cash,
    [playersObj]
  );
  const getOtherPlayerName = useCallback(
    pid => playersObj && playersObj[pid] && playersObj[pid].name,
    [playersObj]
  );
  const getOtherPlayerSets = useCallback(
    pid => playersObj && playersObj[pid] && playersObj[pid].sets,
    [playersObj]
  );
  const getOtherPlayerHand = useCallback(
    pid => playersObj && playersObj[pid] && playersObj[pid].hand,
    [playersObj]
  );
  const getPlayerById = useCallback(
    id => players.find(player => player.id === id),
    [players]
  );
  const getMainPlayer = useCallback(() => mainPlayer, [mainPlayer]);
  const getMainPlayerId = useCallback(() => mainPlayerId, [mainPlayerId]);
  const getMainPlayerName = useCallback(() => mainPlayerName, [mainPlayerName]);
  const getMainPlayerHand = useCallback(() => mainPlayerHand, [mainPlayerHand]);
  const getMainPlayerCashInHand = useCallback(() => mainPlayerHandCash, [
    mainPlayerHandCash,
  ]);
  const getMainPlayerPropertiesInHand = useCallback(
    () => mainPlayerHandProperties,
    [mainPlayerHandProperties]
  );
  const getMainPlayerActionsInHand = useCallback(() => mainPlayerHandActions, [
    mainPlayerHandActions,
  ]);
  const getMainPlayerSets = useCallback(() => mainPlayerSets, [mainPlayerSets]);
  const getMainPlayerCash = useCallback(() => mainPlayerCash, [mainPlayerCash]);
  const isMainPlayersTurn = useCallback(() => currentPlayer === playerId, [
    currentPlayer,
    playerId,
  ]);
  const gameHasOpenTasks = useCallback(() => numTasks > 0, [numTasks]);
  const mainPlayerHasAnOpenTask = useCallback(
    () => nextTask && nextTask.to === playerId,
    [playerId, nextTask]
  );
  const getMainPlayerOpenTask = useCallback(
    () => nextTask && nextTask.to === playerId && nextTask,
    [playerId, nextTask]
  );
  const getCardsToSteal = useCallback(() => {
    const cardsToSteal = [];
    otherPlayers.forEach(player => {
      player.sets.forEach(set => {
        if (!set.complete) {
          set.cards.forEach(card => {
            cardsToSteal.push({
              owner: {
                id: player.id,
                name: player.name,
              },
              ...card,
            });
          });
        }
      });
    });
    return cardsToSteal;
  }, [otherPlayers]);

  const getSetsToSteal = useCallback(() => {
    const setsToSteal = []; // {owner: {id, name}, id, ...set}
    otherPlayers.forEach(player => {
      player.sets.forEach(set => {
        if (set.complete) {
          setsToSteal.push({
            id: `${player.id}-${set.color}`,
            owner: {
              id: player.id,
              name: player.name,
            },
            ...set,
          });
        }
      });
    });
    return setsToSteal;
  }, [otherPlayers]);

  return (
    <Provider
      value={{
        playerId,
        gameId,
        state: gameState,
        getGameStatus,
        getPlayers,
        getPlayerById,
        canStartGame,
        gameHasStarted,
        gameHasEnded,
        getGameWinner,
        getOtherPlayerIds,
        getOtherPlayerCash,
        getOtherPlayerName,
        getOtherPlayerHand,
        getOtherPlayerSets,
        getMainPlayer,
        getMainPlayerId,
        getMainPlayerName,
        getMainPlayerHand,
        getMainPlayerCash,
        getMainPlayerCashInHand,
        getMainPlayerPropertiesInHand,
        getMainPlayerActionsInHand,
        getMainPlayerSets,
        getCardsToSteal,
        getSetsToSteal,
        isMainPlayersTurn,
        gameHasOpenTasks,
        mainPlayerHasAnOpenTask,
        getMainPlayerOpenTask,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
