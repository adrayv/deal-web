import React, { useContext, createContext, useState, useEffect } from 'react';
import db from 'services/firebase/firestore';
import { useMatch, navigate } from '@reach/router';
import { getSaveToken } from 'services/save-token';

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

  return (
    <Provider
      value={{
        state: gameState,
        playerId,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
