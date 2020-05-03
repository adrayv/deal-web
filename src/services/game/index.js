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
