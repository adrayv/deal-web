import { reducer, actionCreators, taskTypes } from 'game/core';

test('playing a rent card', () => {
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
        hand: [
          {
            id: 'rent-blue-green-0',
            type: 'rent',
            value: 1,
            name: 'rent-blue-green',
            colors: ['blue', 'green'],
          },
        ],
      },
      p3: {
        id: 'p3',
        name: 'player 3',
        properties: [],
        sets: [],
        cash: [{ id: 'cash-val-2-1', type: 'cash', value: 2 }],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-blue-green-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectColorToRent('p2', 'blue')
  );

  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(8);
  expect(newState.tasks[1].to).toBe('p3');
  expect(newState.tasks[1].from).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[1].payload.amount).toBe(8);
});

test('playing a rent card for a color you dont have', () => {
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
        hand: [
          {
            id: 'rent-blue-green-0',
            type: 'rent',
            value: 1,
            name: 'rent-blue-green',
            colors: ['blue', 'green'],
          },
        ],
      },
      p3: {
        id: 'p3',
        name: 'player 3',
        properties: [],
        sets: [],
        cash: [{ id: 'cash-val-2-1', type: 'cash', value: 2 }],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-blue-green-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectColorToRent('p2', 'green')
  );

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-blue-green-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);
});

test('playing a rent card for a color that the rent card doesnt specify', () => {
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
        hand: [
          {
            id: 'rent-yellow-red-0',
            type: 'rent',
            value: 1,
            name: 'rent-yellow-red',
            colors: ['yellow', 'red'],
          },
        ],
      },
      p3: {
        id: 'p3',
        name: 'player 3',
        properties: [],
        sets: [],
        cash: [{ id: 'cash-val-2-1', type: 'cash', value: 2 }],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-yellow-red-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectColorToRent('p2', 'blue')
  );

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-yellow-red-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);
});

test('playing a rent card against someone who cant pay rent', () => {
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
        hand: [
          {
            id: 'rent-blue-green-0',
            type: 'rent',
            value: 1,
            name: 'rent-blue-green',
            colors: ['blue', 'green'],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-blue-green-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectColorToRent('p2', 'blue')
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(8);
});

test('playing an any rent card', () => {
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
        hand: [
          {
            id: 'rent-any-0',
            type: 'rent',
            value: 3,
            name: 'rent-any',
            colors: [
              'purple',
              'orange',
              'yellow',
              'red',
              'blue',
              'green',
              'black',
              'mint',
              'sky',
              'brown',
            ],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-any-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerAndColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectPlayerAndColorToRent('p2', 'p1', 'blue')
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.payCharge);
  expect(newState.tasks[0].payload.amount).toBe(8);
});

test('playing an any rent card against someone who cant pay rent', () => {
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
        hand: [
          {
            id: 'rent-any-0',
            type: 'rent',
            value: 3,
            name: 'rent-any',
            colors: [
              'purple',
              'orange',
              'yellow',
              'red',
              'blue',
              'green',
              'black',
              'mint',
              'sky',
              'brown',
            ],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-any-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerAndColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectPlayerAndColorToRent('p2', 'p3', 'blue')
  );

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-any-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerAndColorToRent);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
});

test('playing an any rent card for a color you dont have', () => {
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
        hand: [
          {
            id: 'rent-any-0',
            type: 'rent',
            value: 3,
            name: 'rent-any',
            colors: [
              'purple',
              'orange',
              'yellow',
              'red',
              'blue',
              'green',
              'black',
              'mint',
              'sky',
              'brown',
            ],
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

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-any-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerAndColorToRent);

  newState = reducer(
    newState,
    actionCreators.resolveSelectColorToRent('p2', 'p1', 'green')
  );

  expect(newState.players.p2.hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('rent-any-0');
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectPlayerAndColorToRent);
});
