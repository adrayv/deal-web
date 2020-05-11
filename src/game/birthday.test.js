import { reducer, actionCreators, taskTypes, gameStatuses } from 'game/core';

test('playing a birthday card', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [],
    discard: [],
    players: {
      p1: {
        id: 'p1',
        name: 'player 1',
        properties: [],
        sets: [],
        cash: [{ id: 'cash-val-2-0', type: 'cash', value: 2 }],
        hand: [],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
          {
            id: 'action-birthday-0',
            type: 'action',
            value: 2,
            name: 'birthday',
          },
        ],
      },
      p3: {
        id: 'p3',
        name: 'player 3',
        properties: [],
        sets: [],
        cash: [{ id: 'cash-val-2-0', type: 'cash', value: 2 }],
        hand: [],
      },
    },
    order: ['p2', 'p1', 'p3'],
    winner: null,
  };
  const newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].name).toBe('birthday');
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[1].to).toBe('p3');
  expect(
    newState.tasks.every(
      task =>
        task.from === 'p2' &&
        task.type == taskTypes.payCharge &&
        task.payload.amount === 2
    )
  ).toBe(true);
});
