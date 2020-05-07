import { reducer, actionCreators, gameStatuses, taskTypes } from 'game/core';
import { Player } from 'game/entities';
import { generateDeck } from 'utils/deck';
import { shuffle } from 'utils/array';

/*
  TODO: 
  - trying to play card while task is active
  - playing action card as cash
*/

test('joining a game', () => {
  const state = {
    turn: 0,
    status: gameStatuses.pending,
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
        hand: [],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const newPlayer = Player('p3');
  const newState = reducer(state, actionCreators.joinGame(newPlayer));
  expect(Boolean(newState.players[newPlayer.id])).toBe(true);
  expect(newState.order[2]).toBe(newPlayer.id);
  expect(newState.status).toBe(gameStatuses.ready);
});

test('starting a game', () => {
  const state = {
    turn: 0,
    status: gameStatuses.ready,
    cardsPlayed: 0,
    tasks: [],
    deck: shuffle(generateDeck()),
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
        hand: [],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const currentDeckSize = state.deck.length;
  const newState = reducer(state, actionCreators.startGame());
  Object.values(newState.players).forEach(player => {
    expect(player.hand.length).toBe(5);
  });
  expect(newState.deck.length).toBe(currentDeckSize - 10);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(2);
});

test('playing a cash card', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    deck: [],
    tasks: [],
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
        hand: [{ id: 'cash-val-2-4', type: 'cash', value: 2 }],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const cardToPlay = state.players['p2'].hand[0];
  const newState = reducer(state, actionCreators.playCard('p2', cardToPlay));
  expect(
    newState.players['p2'].hand.find(card => card.id === cardToPlay.id)
  ).toBe(undefined);
  expect(newState.cardsPlayed).toBe(1);
  expect(
    Boolean(newState.players['p2'].cash.find(card => card.id === cardToPlay.id))
  ).toBe(true);
});

test('playing a property card', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    deck: [],
    discard: [],
    tasks: [],
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
            id: 'property-orange-st-james',
            type: 'property',
            name: 'st-james',
            color: 'orange',
            value: 2,
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const cardToPlay = state.players['p2'].hand[0];
  const newState = reducer(state, actionCreators.playCard('p2', cardToPlay));
  expect(
    newState.players['p2'].hand.find(card => card.id === cardToPlay.id)
  ).toBe(undefined);
  expect(newState.cardsPlayed).toBe(1);
  expect(
    Boolean(
      newState.players['p2'].sets.find(set =>
        set.cards.find(card => card.id === cardToPlay.id)
      )
    )
  ).toBe(true);
});

test('playing 3 cards', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      {
        id: 'property-mint-water-works',
        type: 'property',
        name: 'water-works',
        color: 'mint',
        value: 2,
      },
      {
        id: 'property-purple-st-charles',
        type: 'property',
        name: 'st-charles',
        color: 'purple',
        value: 2,
      },
    ],
    discard: [],
    players: {
      p1: {
        id: 'p1',
        name: 'player 1',
        properties: [],
        sets: [],
        cash: [],
        hand: [{ id: 'cash-val-1-0', type: 'cash', value: 1 }],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
          {
            id: 'property-orange-st-james',
            type: 'property',
            name: 'st-james',
            color: 'orange',
            value: 2,
          },
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const cardsToPlay = state.players['p2'].hand.slice(0, 3);
  const nextPlayerCardCount = state.players['p1'].hand.length;
  const currentDeckCount = state.deck.length;
  const currentTaskCount = state.tasks.length;
  let newState = state;
  for (let i = 0; i < cardsToPlay.length; i++) {
    newState = reducer(newState, actionCreators.playCard('p2', cardsToPlay[i]));
  }
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.players['p1'].hand.length).toBe(nextPlayerCardCount);
  expect(newState.deck.length).toBe(currentDeckCount);
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.tasks.length).toBe(currentTaskCount + 1);
  expect(newState.tasks[currentTaskCount].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[currentTaskCount].payload.numCardsToDraw).toBe(2);
  expect(newState.tasks[currentTaskCount].to).toBe('p1');
});

test('drawing a card', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    deck: [{ id: 'cash-val-1-0', type: 'cash', value: 1 }],
    discard: [],
    tasks: [],
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
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const nextCardInDeck = state.deck[state.deck.length - 1];
  const currentDeckSize = state.deck.length;
  const currentPlayerCardCount = state.players['p2'].hand.length;

  const newState = reducer(state, actionCreators.drawCard('p2'));

  expect(newState.players['p2'].hand.length).toBe(currentPlayerCardCount + 1);
  expect(newState.deck.length).toBe(currentDeckSize - 1);
  expect(
    Boolean(
      newState.players['p2'].hand.find(card => card.id === nextCardInDeck.id)
    )
  ).toBe(true);
});

test('ending a turn', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      {
        id: 'property-mint-water-works',
        type: 'property',
        name: 'water-works',
        color: 'mint',
        value: 2,
      },
      {
        id: 'property-purple-st-charles',
        type: 'property',
        name: 'st-charles',
        color: 'purple',
        value: 2,
      },
    ],
    discard: [],
    players: {
      p1: {
        id: 'p1',
        name: 'player 1',
        properties: [],
        sets: [],
        cash: [],
        hand: [{ id: 'cash-val-1-4', type: 'cash', value: 1 }],
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

  const { order, turn } = state;
  const currentPlayer = order[turn];
  const nextPlayerHandSize = state.players['p1'].hand.length;
  const currentDeckSize = state.deck.length;
  const currentTaskCount = state.tasks.length;

  const newState = reducer(state, actionCreators.endTurn(currentPlayer));
  const { order: _order, turn: _turn, cardsPlayed } = newState;
  const nextPlayer = _order[_turn];
  expect(nextPlayer).toBe('p1');
  expect(cardsPlayed).toBe(0);
  expect(newState.players['p1'].hand.length).toBe(nextPlayerHandSize);
  expect(newState.deck.length).toBe(currentDeckSize);
  expect(newState.tasks.length).toBe(currentTaskCount + 1);
  expect(newState.tasks[currentTaskCount].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[currentTaskCount].payload.numCardsToDraw).toBe(2);
  expect(newState.tasks[currentTaskCount].to).toBe('p1');
});

test('starting a turn with 0 cards in hand', () => {
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
        hand: [{ id: 'cash-val-1-4', type: 'cash', value: 1 }],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const currentPlayer = state.order[state.turn];
  const newState = reducer(state, actionCreators.endTurn(currentPlayer));
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(5);
});

test('resolving a draw 5 cards task', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      { id: 'cash-val-1-4', type: 'cash', value: 1 },
      { id: 'cash-val-1-5', type: 'cash', value: 1 },
      { id: 'cash-val-1-3', type: 'cash', value: 1 },
      {
        id: 'property-mint-water-works',
        type: 'property',
        name: 'water-works',
        color: 'mint',
        value: 2,
      },
      {
        id: 'property-purple-st-charles',
        type: 'property',
        name: 'st-charles',
        color: 'purple',
        value: 2,
      },
    ],
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
        hand: [],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(state, actionCreators.endTurn('p2'));
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(5);
  expect(newState.tasks[0].to).toBe('p1');
  newState = reducer(newState, actionCreators.resolveDrawCards('p1'));
  expect(newState.players['p1'].hand.length).toBe(5);
  expect(newState.players['p1'].hand[0].id).toBe('property-purple-st-charles');
  expect(newState.players['p1'].hand[1].id).toBe('property-mint-water-works');
  expect(newState.players['p1'].hand[2].id).toBe('cash-val-1-3');
  expect(newState.players['p1'].hand[3].id).toBe('cash-val-1-5');
  expect(newState.players['p1'].hand[4].id).toBe('cash-val-1-4');
  expect(newState.deck.length).toBe(0);
});

test('resolving a draw 2 cards task', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      {
        id: 'property-mint-water-works',
        type: 'property',
        name: 'water-works',
        color: 'mint',
        value: 2,
      },
      {
        id: 'property-purple-st-charles',
        type: 'property',
        name: 'st-charles',
        color: 'purple',
        value: 2,
      },
    ],
    discard: [],
    players: {
      p1: {
        id: 'p1',
        name: 'player 1',
        properties: [],
        sets: [],
        cash: [],
        hand: [{ id: 'cash-val-1-4', type: 'cash', value: 1 }],
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
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(2);
  expect(newState.tasks[0].to).toBe('p1');
  newState = reducer(newState, actionCreators.resolveDrawCards('p1'));
  expect(newState.players['p1'].hand.length).toBe(3);
  expect(newState.players['p1'].hand[2].id).toBe('property-mint-water-works');
  expect(newState.players['p1'].hand[1].id).toBe('property-purple-st-charles');
  expect(newState.deck.length).toBe(0);
});

test('ending a turn with more than 7 cards in hand', () => {
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
          { id: 'cash-val-1-0', type: 'cash', value: 1 },
          { id: 'cash-val-1-1', type: 'cash', value: 1 },
          { id: 'cash-val-1-2', type: 'cash', value: 1 },
          { id: 'cash-val-1-3', type: 'cash', value: 1 },
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
          { id: 'cash-val-1-6', type: 'cash', value: 1 },
          { id: 'cash-val-1-7', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const newState = reducer(state, actionCreators.endTurn('p2'));
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[1].type).toBe(taskTypes.discardCards);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].payload.numCardsToDiscard).toBe(1);
});

test('playing pass go card', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      { id: 'cash-val-1-0', type: 'cash', value: 1 },
      { id: 'cash-val-1-1', type: 'cash', value: 1 },
      { id: 'cash-val-1-2', type: 'cash', value: 1 },
      { id: 'cash-val-1-3', type: 'cash', value: 1 },
    ],
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
          { id: 'action-pass-go-0', type: 'action', value: 1, name: 'pass-go' },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  const cardToPlay = state.players['p2'].hand[0];
  let newState = reducer(state, actionCreators.playCard('p2', cardToPlay));
  expect(newState.discard.length).toBe(1);
  expect(newState.discard[0].id).toBe('action-pass-go-0');
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(
    Boolean(
      newState.players['p2'].hand.find(card => card.id === 'action-pass-go-0')
    )
  ).toBe(false);
  expect(newState.tasks.length).toBe(1);
  expect(newState.tasks[0].to).toBe('p2');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(2);
  expect(newState.cardsPlayed).toBe(1);
  newState = reducer(newState, actionCreators.resolveDrawCards('p2'));
  expect(newState.tasks.length).toBe(0);
  expect(newState.players['p2'].hand.length).toBe(2);
  expect(newState.deck.length).toBe(2);
  expect(newState.cardsPlayed).toBe(1);
});

test('playing action card as last card in turn', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      { id: 'cash-val-1-0', type: 'cash', value: 1 },
      { id: 'cash-val-1-1', type: 'cash', value: 1 },
    ],
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
          { id: 'action-pass-go-0', type: 'action', value: 1, name: 'pass-go' },
          { id: 'cash-val-1-2', type: 'cash', value: 1 },
          { id: 'cash-val-1-3', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(
    state,
    actionCreators.playCard('p2', {
      id: 'cash-val-1-2',
      type: 'cash',
      value: 1,
    })
  );
  newState = reducer(
    newState,
    actionCreators.playCard('p2', {
      id: 'cash-val-1-3',
      type: 'cash',
      value: 1,
    })
  );
  newState = reducer(
    newState,
    actionCreators.playCard('p2', {
      id: 'action-pass-go-0',
      type: 'action',
      value: 1,
      name: 'pass-go',
    })
  );
  expect(newState.players['p2'].hand.length).toBe(0);
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.drawCards);
});

test('play action card as last card and current player has to discard cards', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      { id: 'cash-val-1-2', type: 'cash', value: 1 },
      { id: 'cash-val-1-3', type: 'cash', value: 1 },
      { id: 'cash-val-1-4', type: 'cash', value: 1 },
      { id: 'cash-val-1-5', type: 'cash', value: 1 },
      { id: 'cash-val-1-6', type: 'cash', value: 1 },
      { id: 'cash-val-1-7', type: 'cash', value: 1 },
    ],
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
          { id: 'cash-val-1-0', type: 'cash', value: 1 },
          { id: 'cash-val-1-1', type: 'cash', value: 1 },
          { id: 'cash-val-1-7', type: 'cash', value: 1 },
          { id: 'cash-val-1-9', type: 'cash', value: 1 },
          { id: 'action-pass-go-0', type: 'action', value: 1, name: 'pass-go' },
          { id: 'action-pass-go-1', type: 'action', value: 1, name: 'pass-go' },
          { id: 'action-pass-go-2', type: 'action', value: 1, name: 'pass-go' },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = state;
  const cardsToPlay = state.players['p2'].hand.slice(4);
  expect(cardsToPlay.length).toBe(3);
  expect(cardsToPlay.every(card => card.type === 'action')).toBe(true);

  cardsToPlay.forEach((card, i) => {
    newState = reducer(newState, actionCreators.playCard('p2', card));
    if (i < 2) {
      newState = reducer(newState, actionCreators.resolveDrawCards('p2'));
    }
  });

  expect(newState.deck.length).toBe(2);
  expect(newState.players['p2'].hand.length).toBe(8);
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.tasks.length).toBe(3);
  expect(newState.tasks[2].to).toBe('p2');
  expect(newState.tasks[2].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.discardCards);
  expect(newState.tasks[1].payload.numCardsToDiscard).toBe(1);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(5);

  newState = reducer(newState, actionCreators.resolveDrawCards('p2'));

  expect(newState.deck.length).toBe(0);
  expect(newState.players['p2'].hand.length).toBe(10);
  expect(newState.order[newState.turn]).toBe('p1');
  expect(newState.cardsPlayed).toBe(0);
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].type).toBe(taskTypes.discardCards);
  expect(newState.tasks[1].payload.numCardsToDiscard).toBe(3);
  expect(newState.tasks[0].to).toBe('p1');
  expect(newState.tasks[0].type).toBe(taskTypes.drawCards);
  expect(newState.tasks[0].payload.numCardsToDraw).toBe(5);
});

test('resolving a discard cards task', () => {
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
          { id: 'cash-val-1-0', type: 'cash', value: 1 },
          { id: 'cash-val-1-1', type: 'cash', value: 1 },
          { id: 'cash-val-1-2', type: 'cash', value: 1 },
          { id: 'cash-val-1-3', type: 'cash', value: 1 },
          { id: 'cash-val-1-4', type: 'cash', value: 1 },
          { id: 'cash-val-1-5', type: 'cash', value: 1 },
          { id: 'cash-val-1-6', type: 'cash', value: 1 },
          { id: 'cash-val-1-7', type: 'cash', value: 1 },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };
  let newState = reducer(state, actionCreators.endTurn('p2'));
  expect(newState.tasks.length).toBe(2);
  expect(newState.tasks[1].type).toBe(taskTypes.discardCards);
  expect(newState.tasks[1].to).toBe('p2');
  expect(newState.tasks[1].payload.numCardsToDiscard).toBe(1);
  newState = reducer(
    newState,
    actionCreators.resolveDiscardCards('p2', [
      { id: 'cash-val-1-4', type: 'cash', value: 1 },
    ])
  );
  expect(newState.tasks.length).toBe(1);
  expect(newState.discard.length).toBe(1);
  expect(
    Boolean(
      newState.players['p2'].hand.find(card => card.id === 'cash-val-1-4')
    )
  ).toBe(false);
  expect(newState.discard[0].id).toBe('cash-val-1-4');
});

test('completing a set', () => {
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
          {
            id: 'property-green-north-carolina',
            type: 'property',
            name: 'north-carolina',
            color: 'green',
            value: 4,
          },
        ],
      },
    },
    order: ['p2', 'p1'],
    winner: null,
  };

  const cardsToPlay = state.players['p2'].hand;
  let newState = state;
  for (let i = 0; i < cardsToPlay.length; i++) {
    newState = reducer(newState, actionCreators.playCard('p2', cardsToPlay[i]));
  }
  expect(
    Boolean(
      newState.players['p2'].sets.find(
        set => set.complete && set.color === 'green'
      )
    )
  ).toBe(true);
});

test('winning a game', () => {
  const state = {
    turn: 0,
    status: 'in-progress',
    cardsPlayed: 0,
    tasks: [],
    deck: [
      { id: 'cash-val-1-1', type: 'cash', value: 1 },
      { id: 'cash-val-4-0', type: 'cash', value: 4 },
      { id: 'cash-val-2-1', type: 'cash', value: 2 },
      { id: 'cash-val-1-4', type: 'cash', value: 1 },
      { id: 'cash-val-1-5', type: 'cash', value: 1 },
      { id: 'cash-val-3-2', type: 'cash', value: 3 },
      { id: 'cash-val-3-1', type: 'cash', value: 3 },
      { id: 'cash-val-5-0', type: 'cash', value: 5 },
      { id: 'cash-val-4-2', type: 'cash', value: 4 },
    ],
    discard: [],
    players: {
      p1: {
        id: 'p1',
        name: 'player 1',
        properties: [],
        sets: [],
        cash: [],
        hand: [{ id: 'cash-val-1-10', type: 'cash', value: 1 }],
      },
      p2: {
        id: 'p2',
        name: 'player 2',
        properties: [],
        cash: [],
        sets: [],
        hand: [
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
    },
    order: ['p2', 'p1'],
    winner: null,
  };

  let newState = state;
  const mintCards = state.players['p2'].hand.filter(
    card => card.type === 'property' && card.color === 'mint'
  );
  expect(mintCards.length).toBe(2);
  for (let i = 0; i < mintCards.length; i++) {
    newState = reducer(newState, actionCreators.playCard('p2', mintCards[i]));
  }
  newState = reducer(newState, actionCreators.endTurn('p2'));
  newState = reducer(newState, actionCreators.resolveDrawCards('p1'));
  newState = reducer(newState, actionCreators.endTurn('p1'));

  newState = reducer(newState, actionCreators.resolveDrawCards('p2'));
  const blueCards = newState.players['p2'].hand.filter(
    card => card.type === 'property' && card.color === 'blue'
  );
  expect(blueCards.length).toBe(2);
  for (let i = 0; i < blueCards.length; i++) {
    newState = reducer(newState, actionCreators.playCard('p2', blueCards[i]));
  }
  newState = reducer(newState, actionCreators.endTurn('p2'));
  newState = reducer(newState, actionCreators.resolveDrawCards('p1'));
  newState = reducer(newState, actionCreators.endTurn('p1'));

  newState = reducer(newState, actionCreators.resolveDrawCards('p2'));
  const brownCards = newState.players['p2'].hand.filter(
    card => card.type === 'property' && card.color === 'brown'
  );
  expect(brownCards.length).toBe(2);
  for (let i = 0; i < brownCards.length; i++) {
    newState = reducer(newState, actionCreators.playCard('p2', brownCards[i]));
  }

  expect(newState.winner).toBe('p2');
  expect(newState.status).toBe(gameStatuses.done);
});
