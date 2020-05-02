import db from 'services/firebase/firestore';
import request from 'superagent';

export const createGame = async player => {
  return (
    await request
      .post(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_URL}/createGame`)
      .send({
        player,
      })
  ).body;
};

export const joinGame = async (gameId, player) => {
  return (
    await request
      .post(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_URL}/joinGame`)
      .send({
        gameId,
        player,
      })
  ).body;
};

export const startGame = async gameId => {
  await db
    .collection('commands')
    .add({ gameId, type: '@start-game', payload: {} });
};
