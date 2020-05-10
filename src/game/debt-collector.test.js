import { reducer, actionCreators, taskTypes } from 'game/core';

test('playing a debt collector card', () => {
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
        cash: [],
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
            id: 'action-debt-collector-0',
            type: 'action',
            value: 3,
            name: 'debt-collector',
          },
        ],
      },
      p3: {
        id: 'p3',
        name: 'player 3',
        properties: [],
        sets: [],
        cash: [],
        hand: [],
      },
    },
    order: ['p2', 'p1', 'p3'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerToCharge);
  expect(newState.tasks[0].payload.amount).toBe(5);

  newState = reducer(
    newState,
    actionCreators.resolveSelectPlayerToCharge('p2', 'p1')
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(5);
});
