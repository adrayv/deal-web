import { reducer, actionCreators, taskTypes, gameStatuses } from 'game/core';

/*
	- sly deal getting just-say-no'd
	- trying to play a sly deal card when there's nothing to steal
  - say no: playing a sly deal in response to a from-to action (can say no to [say-no, sly-deal, forced-deal, charge, dealbreaker])
*/

test('playing a sly deal card', () => {
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
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectCardToSteal);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-sly-deal-0');

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

  newState = reducer(newState, actionCreators.resolveSurrenderCard('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(1);
  expect(newState.players['p1'].sets[0].cards.length).toBe(1);
  expect(newState.players['p1'].sets[0].cards[0].id).toBe(
    'property-purple-states-ave'
  );
  expect(newState.players['p2'].sets.length).toBe(1);
  expect(
    Boolean(
      newState.players['p2'].sets.find(
        set =>
          set.color === 'purple' &&
          set.cards.find(c => c.id === 'property-purple-st-charles')
      )
    )
  ).toBe(true);
});

test('playing sly deal as your last card', () => {
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
            id: 'action-sly-deal-0',
            type: 'action',
            value: 3,
            name: 'sly-deal',
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
  expect(newState.tasks[1].type).toBe(taskTypes.selectCardToSteal);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-sly-deal-0');

  const cardToSteal = newState.players['p1'].sets[0].cards[0];

  newState = reducer(
    newState,
    actionCreators.resolveSelectCardToSteal('p2', 'p1', cardToSteal)
  );

  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[1].to).toBe('p1');
  expect(newState.tasks[1].from).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.surrenderCard);
  expect(newState.tasks[1].payload.cardToSurrender.id).toBe(
    'property-purple-st-charles'
  );

  newState = reducer(newState, actionCreators.resolveSurrenderCard('p1'));

  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].from).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.players['p1'].sets.length).toBe(1);
  expect(newState.players['p1'].sets[0].cards.length).toBe(1);
  expect(newState.players['p1'].sets[0].cards[0].id).toBe(
    'property-purple-states-ave'
  );
  expect(newState.players['p2'].sets.length).toBe(1);
  expect(
    Boolean(
      newState.players['p2'].sets.find(
        set =>
          set.color === 'purple' &&
          set.cards.find(c => c.id === 'property-purple-st-charles')
      )
    )
  ).toBe(true);
});

test('sly deal leading to a complete set', () => {
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
            color: 'green',
            cards: [
              {
                id: 'property-green-north-carolina',
                type: 'property',
                name: 'north-carolina',
                color: 'green',
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
        sets: [
          {
            complete: false,
            color: 'green',
            cards: [
              {
                id: 'property-green-pennsylvania',
                type: 'property',
                name: 'pennsylvania',
                color: 'green',
                value: 4,
              },
              {
                id: 'property-green-pacific',
                type: 'property',
                name: 'pacific',
                color: 'green',
                value: 4,
              },
            ],
          },
        ],
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
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].from).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.selectCardToSteal);
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-sly-deal-0');

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
    'property-green-north-carolina'
  );

  newState = reducer(newState, actionCreators.resolveSurrenderCard('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(0);
  expect(newState.players['p2'].sets[0].complete).toBe(true);
  expect(
    Boolean(
      newState.players['p2'].sets.find(
        set =>
          set.complete &&
          set.color === 'green' &&
          set.cards.find(c => c.id === 'property-green-north-carolina')
      )
    )
  ).toBe(true);
});

test('sly deal leading to a win', () => {
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
    'property-mint-electric-company'
  );

  newState = reducer(newState, actionCreators.resolveSurrenderCard('p1'));

  expect(newState.tasks.length).toBe(0);
  expect(newState.cardsPlayed).toBe(1);
  expect(newState.players['p1'].sets.length).toBe(0);
  expect(newState.players['p2'].sets[0].complete).toBe(true);
  expect(newState.players['p2'].sets.every(set => set.complete)).toBe(true);
  expect(newState.winner).toBe('p2');
  expect(newState.status).toBe(gameStatuses.done);
  expect(
    Boolean(
      newState.players['p2'].sets.find(
        set =>
          set.complete &&
          set.color === 'mint' &&
          set.cards.find(c => c.id === 'property-mint-electric-company')
      )
    )
  ).toBe(true);
});
