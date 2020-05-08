import { reducer, actionCreators, taskTypes } from 'game/core';

/*
	- dealbreaker getting just-say-no'd
	- trying to play a dealbreaker when there's nothing to steal
*/

test('playing a dealbreaker card', () => {
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
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectSetToSteal);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-dealbreaker-0');

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.surrenderSet);
  expect(newState.tasks[0].payload.setToSurrenderIndex).toBe(0);

  newState = reducer(newState, actionCreators.resolveSurrenderSet('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(0);
  expect(newState.players['p2'].sets.length).toBe(1);
  expect(newState.players['p2'].sets[0].complete).toBe(true);
  expect(newState.players['p2'].sets[0].color).toBe('blue');
  expect(newState.players['p2'].sets[0].cards.length).toBe(2);
});

test('playing dealbreaker as your last card', () => {
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
    actionCreators.playCard('p2', newState.players['p2'].hand[1])
  );

  expect(newState.players['p2'].cash.length).toBe(2);

  newState = reducer(
    newState,
    actionCreators.playCard('p2', newState.players['p2'].hand[0])
  );

  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].from).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.selectSetToSteal);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-dealbreaker-0');

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[1].to).toBe('p1');
  expect(newState.tasks[1].from).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.surrenderSet);
  expect(newState.tasks[1].payload.setToSurrenderIndex).toBe(0);

  newState = reducer(newState, actionCreators.resolveSurrenderSet('p1'));

  expect(newState.cardsPlayed).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.players['p1'].sets.length).toBe(0);
  expect(newState.players['p2'].sets.length).toBe(1);
  expect(newState.players['p2'].sets[0].complete).toBe(true);
  expect(newState.players['p2'].sets[0].color).toBe('blue');
  expect(newState.players['p2'].sets[0].cards.length).toBe(2);
});

test('stealing one of many sets from a player', () => {
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
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectSetToSteal);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-dealbreaker-0');

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.surrenderSet);
  expect(newState.tasks[0].payload.setToSurrenderIndex).toBe(0);

  newState = reducer(newState, actionCreators.resolveSurrenderSet('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(1);
  expect(newState.players['p1'].sets[0].complete).toBe(true);
  expect(newState.players['p1'].sets[0].color).toBe('brown');
  expect(newState.players['p1'].sets[0].cards.length).toBe(2);
  expect(newState.players['p2'].sets.length).toBe(1);
  expect(newState.players['p2'].sets[0].complete).toBe(true);
  expect(newState.players['p2'].sets[0].color).toBe('blue');
  expect(newState.players['p2'].sets[0].cards.length).toBe(2);
});

test('dealbreaker leading to a win', () => {
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
        cash: [],
        hand: [],
        sets: [
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
        ],
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
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectSetToSteal);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-dealbreaker-0');

  newState = reducer(
    newState,
    actionCreators.resolveSelectSetToSteal('p2', 'p1', 0)
  );

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.surrenderSet);
  expect(newState.tasks[0].payload.setToSurrenderIndex).toBe(0);

  newState = reducer(newState, actionCreators.resolveSurrenderSet('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(0);
  expect(newState.players['p2'].sets.length).toBe(3);
  expect(newState.players['p2'].sets.every(set => set.complete));
  expect(newState.winner).toBe('p2');
});
