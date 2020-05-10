import { reducer, actionCreators, taskTypes } from 'game/core';

test('saying no to a sly deal', () => {
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
        sets: [
          {
            complete: false,
            color: 'purple',
            cards: [
              {
                id: 'property-purple-st-charles',
                type: 'property',
                name: 'st-charles',
                color: 'purple',
                value: 2,
              },
              {
                id: 'property-purple-states-ave',
                type: 'property',
                name: 'states-ave',
                color: 'purple',
                value: 2,
              },
            ],
          },
        ],
        cash: [],
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
          {
            id: 'action-sly-deal-0',
            type: 'action',
            value: 3,
            name: 'sly-deal',
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players['p2'].hand[0])
  );

  const cardToSteal = newState.players['p1'].sets[0].cards[0];

  newState = reducer(
    newState,
    actionCreators.resolveSelectCardToSteal('p2', 'p1', cardToSteal)
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.surrenderCard);
  expect(newState.tasks[0].payload.cardToSurrender.id).toBe(
    'property-purple-st-charles'
  );

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.discard.length).toBe(2);
  expect(newState.discard[0].name).toBe('sly-deal');
  expect(newState.discard[1].name).toBe('say-no');
  expect(newState.tasks.length).toBe(0);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.players['p1'].sets[0].cards.length).toBe(2);
  expect(newState.players['p2'].sets.length).toBe(0);
});

test('saying no to a dealbreaker', () => {
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
        sets: [
          {
            complete: true,
            color: 'blue',
            cards: [
              {
                id: 'property-blue-park-place',
                type: 'property',
                name: 'park-place',
                color: 'blue',
                value: 4,
              },
              {
                id: 'property-blue-boardwalk',
                type: 'property',
                name: 'boardwalk',
                color: 'blue',
                value: 4,
              },
            ],
          },
        ],
        cash: [],
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
          {
            id: 'action-dealbreaker-0',
            type: 'action',
            value: 5,
            name: 'dealbreaker',
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players['p2'].hand[0])
  );

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.cardsPlayed).toBe(1);
  expect(newState.tasks.length).toBe(0);
  expect(newState.discard.length).toBe(2);
  expect(newState.discard[0].name).toBe('dealbreaker');
  expect(newState.discard[1].name).toBe('say-no');
  expect(newState.players['p1'].sets.length).toBe(1);
  expect(newState.players['p2'].sets.length).toBe(0);
  expect(newState.players['p2'].hand.length).toBe(0);
});

test('saying no when you dont have the card', () => {
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
        sets: [
          {
            complete: true,
            color: 'blue',
            cards: [
              {
                id: 'property-blue-park-place',
                type: 'property',
                name: 'park-place',
                color: 'blue',
                value: 4,
              },
              {
                id: 'property-blue-boardwalk',
                type: 'property',
                name: 'boardwalk',
                color: 'blue',
                value: 4,
              },
            ],
          },
        ],
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
            id: 'action-dealbreaker-0',
            type: 'action',
            value: 5,
            name: 'dealbreaker',
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players['p2'].hand[0])
  );

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.cardsPlayed).toBe(1);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.surrenderSet);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].name).toBe('dealbreaker');
});

test('saying no at the wrong time', () => {
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
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(state, actionCreators.endTurn('p2'));

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.cardsPlayed).toBe(0);
  expect(newState.players['p1'].hand.length).toBe(1);
  expect(newState.players['p1'].hand[0].name).toBe('say-no');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
});

test('playing a say no card as a regular action', () => {
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
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };

  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );

  expect(newState.cardsPlayed).toBe(1);
  expect(newState.tasks.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.players.p2.hand.length).toBe(0);
});

test('when saying no is your last card, and its your turn next', () => {
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
        sets: [
          {
            complete: true,
            color: 'blue',
            cards: [
              {
                id: 'property-blue-park-place',
                type: 'property',
                name: 'park-place',
                color: 'blue',
                value: 4,
              },
              {
                id: 'property-blue-boardwalk',
                type: 'property',
                name: 'boardwalk',
                color: 'blue',
                value: 4,
              },
            ],
          },
        ],
        cash: [],
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
          {
            id: 'action-dealbreaker-0',
            type: 'action',
            value: 5,
            name: 'dealbreaker',
          },
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };

  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players['p2'].hand[2])
  );

  newState = reducer(
    newState,
    actionCreators.playCard('p2', state.players['p2'].hand[1])
  );

  newState = reducer(
    newState,
    actionCreators.playCard('p2', state.players['p2'].hand[0])
  );

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  expect(newState.cardsPlayed).toBe(0);
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(2);

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.cardsPlayed).toBe(0);
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.tasks.length).toBe(1);
  expect(newState.discard.length).toBe(2);
  expect(newState.discard[0].name).toBe('dealbreaker');
  expect(newState.discard[1].name).toBe('say-no');
  expect(newState.players['p1'].sets.length).toBe(1);
  expect(newState.players['p2'].sets.length).toBe(0);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(5);
});

test('saying no to a charge', () => {
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
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
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
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(2);

  newState = reducer(newState, actionCreators.sayNo('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.cash.length).toBe(1);
  expect(newState.players.p1.cash[0].id).toBe('cash-val-2-0');
  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(2);
  expect(newState.discard[1].name).toBe('say-no');
  expect(newState.players.p2.cash.length).toBe(0);
});

test('saying no in a charge chain', () => {
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
        cash: [
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
        ],
        hand: [
          {
            id: 'action-say-no-0',
            type: 'action',
            value: 4,
            name: 'say-no',
          },
        ],
      },
    },
    order: ['p2', 'p1', 'p3'],
    winner: null,
  };

  let newState = reducer(
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
    newState.tasks
      .slice(1)
      .every(
        task =>
          task.from === 'p2' &&
          task.type == taskTypes.payCharge &&
          task.payload.amount === 2
      )
  ).toBe(true);

  newState = reducer(newState, actionCreators.sayNo('p3'));

  expect(newState.discard.length).toBe(2);
  expect(newState.discard[0].name).toBe('birthday');
  expect(newState.discard[1].name).toBe('say-no');
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.players['p3'].cash.length).toBe(2);
  expect(newState.players['p3'].hand.length).toBe(0);
  expect(newState.players['p2'].cash.length).toBe(0);
});
