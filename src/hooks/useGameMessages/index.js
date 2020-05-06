import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import db from 'services/firebase/firestore';
import { useMatch } from '@reach/router';
import { getLastMessage } from 'services/game';
import { messageInterpreter } from 'game/message';

const Context = createContext();

const { Provider } = Context;

export const GameMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const match = useMatch('/games/:gameId');
  const gameId = match && match.gameId;

  useEffect(() => {
    (async () => {
      try {
        if (gameId) {
          const lastMessage = await getLastMessage(gameId);
          setMessage(lastMessage);
          return db
            .collection('games')
            .doc(gameId)
            .collection('messages')
            .orderBy('created_at', 'desc')
            .limit(1)
            .onSnapshot(doc => {
              doc.docChanges().forEach(change => {
                if (change.type === 'added') {
                  const message = change.doc.data();
                  setMessage(message);
                }
              });
            });
        }
      } catch (err) {
        console.error('ERR loading messages', err);
        alert('Issue loading game messages');
      }
    })();
  }, [gameId]);

  const getMessage = useCallback(
    playerId => {
      return message && messageInterpreter(message, { requesterId: playerId });
    },
    [message]
  );

  return (
    <Provider
      value={{
        getMessage,
      }}
    >
      {children}
    </Provider>
  );
};

export default () => useContext(Context);
