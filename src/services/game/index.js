import db from 'services/firebase/firestore';

export const createGame = async state => {
  const { id } = await db.collection('games').add(state);
  return id;
};

export const getGameById = async gameId => {
  const game = await db.collection('games').doc(gameId).get();
  return game.data();
};

export const pushGameState = async (gameId, gameState) => {
  await db.collection('games').doc(gameId).set(gameState);
};

export const startGame = async gameId => {
  await db
    .collection('commands')
    .add({ gameId, type: '@start-game', payload: {} });
};

export const pushMessage = async (gameId, message) => {
  await db.collection('games').doc(gameId).collection('messages').add(message);
};

export const getLastMessage = async gameId => {
  const message = await db
    .collection('games')
    .doc(gameId)
    .collection('messages')
    .orderBy('created_at', 'desc')
    .limit(1)
    .get();
  return message && message.data && message.data();
};
