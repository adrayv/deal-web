import { reducer, actionCreators, taskTypes, gameStatuses } from 'game/core';

test('paying a charge with properties', () => {
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.sets[0].cards[0]])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(1);
  expect(newState.players.p1.sets[0].cards[0].id).toBe(
    'property-purple-states-ave'
  );
  expect(newState.players.p2.sets.length).toBe(1);
  expect(newState.players.p2.sets[0].cards[0].id).toBe(
    'property-purple-st-charles'
  );
});

test('paying a charge with cash', () => {
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.cash[0]])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.cash.length).toBe(0);
  expect(newState.players.p2.cash.length).toBe(1);
  expect(newState.players.p2.cash[0].id).toBe('cash-val-2-0');
});

test('paying a charge with properties and cash', () => {
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
            color: 'brown',
            cards: [
              {
                id: 'property-brown-baltic',
                type: 'property',
                name: 'baltic',
                color: 'brown',
                value: 1,
              },
            ],
          },
        ],
        cash: [{ id: 'cash-val-1-0', type: 'cash', value: 1 }],
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
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [
      newState.players.p1.sets[0].cards[0],
      newState.players.p1.cash[0],
    ])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);

  expect(newState.players.p1.cash.length).toBe(0);
  expect(newState.players.p2.cash.length).toBe(1);
  expect(newState.players.p2.cash[0].id).toBe('cash-val-1-0');

  expect(newState.players.p2.sets.length).toBe(1);
  expect(newState.players.p2.sets[0].cards[0].id).toBe('property-brown-baltic');
});

test('paying a charge leads to a complete set', () => {
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
                id: 'property-virginia-ave',
                type: 'property',
                name: 'virginia-ave',
                color: 'purple',
                value: 2,
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.sets[0].cards[0]])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);

  expect(newState.players.p2.sets.length).toBe(1);
  expect(newState.players.p2.sets[0].color).toBe('purple');
  expect(newState.players.p2.sets[0].complete).toBe(true);
  expect(newState.players.p2.sets[0].cards[2].id).toBe('property-virginia-ave');
});

test('paying a charge leads to a win', () => {
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
            color: 'mint',
            cards: [
              {
                id: 'property-mint-electric-company',
                type: 'property',
                name: 'electric-company',
                color: 'mint',
                value: 2,
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
          {
            complete: true,
            color: 'brown',
            cards: [
              {
                id: 'property-brown-medditerranean',
                type: 'property',
                name: 'medditerranean',
                color: 'brown',
                value: 1,
              },
              {
                id: 'property-brown-baltic',
                type: 'property',
                name: 'baltic',
                color: 'brown',
                value: 1,
              },
            ],
          },
          {
            complete: false,
            color: 'mint',
            cards: [
              {
                id: 'property-mint-water-works',
                type: 'property',
                name: 'water-works',
                color: 'mint',
                value: 2,
              },
            ],
          },
        ],
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.sets[0].cards[0]])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);

  expect(newState.players.p2.sets.length).toBe(3);
  expect(newState.players.p2.sets.every(set => set.complete)).toBe(true);

  expect(newState.winner).toBe('p2');
  expect(newState.status).toBe(gameStatuses.done);
  expect(newState.players.p2.sets[2].cards[1].id).toBe(
    'property-mint-electric-company'
  );
});

test('issuing a charge as your last move', () => {
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
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
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
    actionCreators.playCard('p2', state.players.p2.hand[2])
  );

  newState = reducer(
    newState,
    actionCreators.playCard('p2', newState.players.p2.hand[1])
  );

  newState = reducer(
    newState,
    actionCreators.playCard('p2', newState.players.p2.hand[0])
  );

  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].name).toBe('birthday');
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.tasks.length).toBe(3);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[1].to).toBe('p1');
  expect(newState.tasks[2].to).toBe('p3');
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
});

test('bankrupting someone', () => {
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
            color: 'brown',
            cards: [
              {
                id: 'property-brown-baltic',
                type: 'property',
                name: 'baltic',
                color: 'brown',
                value: 1,
              },
            ],
          },
        ],
        cash: [{ id: 'cash-val-1-0', type: 'cash', value: 1 }],
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
    },
    order: ['p2', 'p1'],
    winner: null,
  };

  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );

  newState = reducer(newState, actionCreators.goBankrupt('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);

  expect(newState.players.p1.cash.length).toBe(0);
  expect(newState.players.p2.cash.length).toBe(1);
  expect(newState.players.p2.cash[0].id).toBe('cash-val-1-0');

  expect(newState.players.p2.sets.length).toBe(1);
  expect(newState.players.p2.sets[0].cards[0].id).toBe('property-brown-baltic');
});

test('bankrupting someone leads to a complete set', () => {
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
                id: 'property-virginia-ave',
                type: 'property',
                name: 'virginia-ave',
                color: 'purple',
                value: 2,
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

  newState = reducer(newState, actionCreators.goBankrupt('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);

  expect(newState.players.p2.sets.length).toBe(1);
  expect(newState.players.p2.sets[0].color).toBe('purple');
  expect(newState.players.p2.sets[0].complete).toBe(true);
  expect(newState.players.p2.sets[0].cards[2].id).toBe('property-virginia-ave');
});

test('bankrupting someone leads to a win', () => {
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
            color: 'brown',
            cards: [
              {
                id: 'property-brown-baltic',
                type: 'property',
                name: 'baltic',
                color: 'brown',
                value: 1,
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
          {
            complete: false,
            color: 'brown',
            cards: [
              {
                id: 'property-brown-medditerranean',
                type: 'property',
                name: 'medditerranean',
                color: 'brown',
                value: 1,
              },
            ],
          },
          {
            complete: true,
            color: 'mint',
            cards: [
              {
                id: 'property-mint-water-works',
                type: 'property',
                name: 'water-works',
                color: 'mint',
                value: 2,
              },
              {
                id: 'property-mint-electric-company',
                type: 'property',
                name: 'electric-company',
                color: 'mint',
                value: 2,
              },
            ],
          },
        ],
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

  newState = reducer(newState, actionCreators.goBankrupt('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(0);
  expect(newState.players.p1.cash.length).toBe(0);

  expect(newState.players.p2.sets.length).toBe(3);
  expect(newState.players.p2.sets.every(set => set.complete)).toBe(true);

  expect(newState.winner).toBe('p2');
  expect(newState.status).toBe(gameStatuses.done);
  expect(newState.players.p2.sets[1].cards[1].id).toBe('property-brown-baltic');
});

test('when payment is less than amount owed', () => {
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
            color: 'brown',
            cards: [
              {
                id: 'property-brown-baltic',
                type: 'property',
                name: 'baltic',
                color: 'brown',
                value: 1,
              },
            ],
          },
        ],
        cash: [{ id: 'cash-val-1-0', type: 'cash', value: 1 }],
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
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', state.players.p2.hand[0])
  );

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.cash[0]])
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(2);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.sets.length).toBe(1);

  expect(newState.players.p1.cash.length).toBe(1);
  expect(newState.players.p2.cash.length).toBe(0);

  expect(newState.players.p2.sets.length).toBe(0);
});

test('paying with a card the player hasnt played', () => {
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
        hand: [{ id: 'cash-val-2-0', type: 'cash', value: 2 }],
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.hand[0]])
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.cash.length).toBe(0);
  expect(newState.players.p2.cash.length).toBe(0);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(2);
});

test('paying a charge when you dont have to', () => {
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
        cash: [
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
        ],
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [
      { id: 'cash-val-1-4', type: 'cash', value: 1 },
      { id: 'cash-val-1-5', type: 'cash', value: 1 },
    ])
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
});

test('overpaying a charge', () => {
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
        cash: [{ id: 'cash-val-5-0', type: 'cash', value: 5 }],
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

  newState = reducer(
    newState,
    actionCreators.resolveCharge('p1', [newState.players.p1.cash[0]])
  );

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players.p1.cash.length).toBe(0);
  expect(newState.players.p2.cash.length).toBe(1);
  expect(newState.players.p2.cash[0].id).toBe('cash-val-5-0');
});
