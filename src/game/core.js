import { generateDeck } from 'utils/deck';
import { shuffle } from 'utils/array';

const config = {
  maxPlayers: 4,
};

export const gameStatuses = {
  pending: 'pending',
  ready: 'ready',
  inProgress: 'in-progress',
  done: 'done',
};

export const actionTypes = {
  joinGame: '@join-game',
  startGame: '@start-game',
  playCard: '@play-card',
  drawCard: '@draw-card',
  resolveTask: {
    drawCards: '@resolve-draw-cards',
    discardCards: '@resolve-discard-cards',
  },
  endTurn: '@end-turn',
};

export const taskTypes = {
  drawCards: '@task-draw-cards',
  discardCards: '@task-discard-cards',
};

export const actionCreators = {
  startGame() {
    return {
      type: actionTypes.startGame,
    };
  },
  playCard(playerId, card) {
    return {
      type: actionTypes.playCard,
      data: {
        playerId,
        card,
      },
    };
  },
  drawCard(playerId) {
    return {
      type: actionTypes.drawCard,
      data: {
        playerId,
      },
    };
  },
  resolveDrawCards(playerId) {
    return {
      type: actionTypes.resolveTask.drawCards,
      data: {
        playerId,
      },
    };
  },
  resolveDiscardCards(playerId, cardsToDiscard) {
    return {
      type: actionTypes.resolveTask.discardCards,
      data: {
        playerId,
        cardsToDiscard,
      },
    };
  },
  endTurn(playerId) {
    return {
      type: actionTypes.endTurn,
      data: {
        playerId,
      },
    };
  },
  joinGame(player) {
    return {
      type: actionTypes.joinGame,
      data: {
        player,
      },
    };
  },
};

const taskCreators = {
  drawCards(playerId, numCardsToDraw) {
    return {
      type: taskTypes.drawCards,
      from: playerId,
      to: playerId,
      payload: {
        numCardsToDraw,
      },
    };
  },
  discardCards(playerId, numCardsToDiscard) {
    return {
      type: taskTypes.discardCards,
      from: playerId,
      to: playerId,
      payload: {
        numCardsToDiscard,
      },
    };
  },
};

export function createInitialGameState(initialPlayer) {
  return {
    turn: 0,
    cardsPlayed: 0,
    deck: shuffle(generateDeck()),
    discard: [],
    tasks: [],
    players: {
      [initialPlayer.id]: initialPlayer,
    },
    order: [initialPlayer.id],
    winner: null,
    status: gameStatuses.pending,
    created_at: new Date(),
  };
}

export function canJoinGame(gameState) {
  return Boolean(
    gameState.order.length < 4 &&
      (gameState.status === gameStatuses.pending ||
        gameState.status === gameStatuses.ready)
  );
}

const numToComplete = {
  purple: 3,
  green: 3,
  brown: 2,
  red: 3,
  orange: 3,
  blue: 2,
  yellow: 3,
  sky: 3,
  mint: 2,
  black: 4,
};

function playerWon(playerId, state) {
  const numCompleteSets = state.players[playerId].sets.reduce(
    (numCompleteSets, set) => {
      if (set.complete) {
        return numCompleteSets + 1;
      }
      return numCompleteSets;
    },
    0
  );
  return numCompleteSets >= 3;
}

function setIsComplete(set) {
  const numPropertiesInSet = set.cards.reduce((numProperties, card) => {
    if (card.type === 'property') {
      return numProperties + 1;
    }
    return numProperties;
  }, 0);
  return numPropertiesInSet === numToComplete[set.color];
}

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.joinGame: {
      const { player } = action.data;
      const newState = Object.assign({}, state);
      const { status, order } = newState;
      if (
        (status === gameStatuses.pending || status === gameStatuses.ready) &&
        order.length < config.maxPlayers
      ) {
        newState.players[player.id] = player;
        newState.order.push(player.id);
        if (newState.order.length > 1) {
          newState.status = gameStatuses.ready;
        }
      }
      return newState;
    }
    case actionTypes.startGame: {
      let newState = Object.assign({}, state);
      if (newState.status === gameStatuses.ready) {
        newState.status = gameStatuses.inProgress;
        // Distribute cards
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < newState.order.length; j++) {
            const playerId = newState.order[j];
            newState = reducer(newState, actionCreators.drawCard(playerId));
          }
        }
        newState.tasks.push(taskCreators.drawCards(newState.order[0], 2));
      }
      return newState;
    }
    case actionTypes.playCard: {
      const { playerId, card } = action.data;
      let newState = Object.assign({}, state);
      const { order, turn, players } = newState;

      if (playerId === order[turn] && state.tasks.length === 0) {
        newState.players[playerId].hand = players[playerId].hand.filter(
          ({ id: cid }) => cid !== card.id
        );
        newState.cardsPlayed++;
        if (newState.cardsPlayed >= 3) {
          newState = reducer(newState, {
            type: actionTypes.endTurn,
            data: {
              playerId,
            },
          });
        }
        switch (card.type) {
          case 'cash': {
            newState.players[playerId].cash.push(card);
            break;
          }
          case 'property': {
            const targetSetIndex = players[playerId].sets.findIndex(
              set => set.color === card.color && !set.complete
            );
            if (targetSetIndex !== -1) {
              newState.players[playerId].sets[targetSetIndex].cards.push(card);
              if (
                setIsComplete(newState.players[playerId].sets[targetSetIndex])
              ) {
                newState.players[playerId].sets[targetSetIndex].complete = true;
              }
            } else {
              newState.players[playerId].sets.push({
                color: card.color,
                complete: false,
                cards: [card],
              });
            }
            if (playerWon(playerId, newState)) {
              newState.winner = playerId;
              newState.status = gameStatuses.done;
            }
            break;
          }
          case 'action': {
            newState.discard.push(card);
            switch (card.name) {
              case 'pass-go': {
                newState.tasks.push(taskCreators.drawCards(playerId, 2));
                break;
              }
              default: {
                // continue
              }
            }
            break;
          }
          default: {
            // continue
          }
        }
      }
      return newState;
    }
    case actionTypes.drawCard: {
      const { playerId } = action.data;
      const newState = Object.assign({}, state);
      const drawnCard = newState.deck.pop();
      newState.players[playerId].hand.push(drawnCard);
      return newState;
    }
    case actionTypes.resolveTask.discardCards: {
      const { playerId, cardsToDiscard } = action.data;
      const newState = Object.assign({}, state);
      const taskToResolve = newState.tasks[newState.tasks.length - 1];
      const player = newState.players[playerId];
      if (
        taskToResolve.to === playerId &&
        player.hand.length - cardsToDiscard.length <= 7
      ) {
        cardsToDiscard.forEach(card => {
          newState.players[playerId].hand = newState.players[
            playerId
          ].hand.filter(({ id: cid }) => cid !== card.id);
          newState.discard.push(card);
        });
        newState.tasks.pop();
      }
      return newState;
    }
    case actionTypes.resolveTask.drawCards: {
      const { playerId } = action.data;
      const newState = Object.assign({}, state);
      const taskToResolve = newState.tasks[newState.tasks.length - 1];
      if (taskToResolve.to === playerId) {
        const { numCardsToDraw } = taskToResolve.payload;
        for (let i = 0; i < numCardsToDraw; i++) {
          newState.players[playerId].hand.push(newState.deck.pop());
        }
        newState.tasks.pop();

        // if you drew cards as your last move and have to discard
        if (
          newState.players[playerId].hand.length > 7 &&
          newState.order[newState.turn] !== playerId
        ) {
          let i = newState.tasks.length - 1;
          // remove any upcoming tasks where this player must discard cards
          while (
            newState.tasks.length > 0 &&
            i >= 0 &&
            newState.tasks[i].to === playerId &&
            newState.tasks[i].type === taskTypes.discardCards
          ) {
            newState.tasks.pop();
            i--;
          }
          newState.tasks.push(
            taskCreators.discardCards(
              playerId,
              newState.players[playerId].hand.length - 7
            )
          );
        }
      }
      return newState;
    }
    case actionTypes.endTurn: {
      const newState = Object.assign({}, state);
      const currentPlayer = state.players[state.order[state.turn]];
      newState.turn =
        newState.turn < newState.order.length - 1 ? newState.turn + 1 : 0;
      newState.cardsPlayed = 0;
      const nextPlayer = newState.players[newState.order[newState.turn]];
      if (nextPlayer.hand.length === 0) {
        newState.tasks.push(taskCreators.drawCards(nextPlayer.id, 5));
      } else {
        newState.tasks.push(taskCreators.drawCards(nextPlayer.id, 2));
      }
      if (currentPlayer.hand.length > 7) {
        newState.tasks.push(
          taskCreators.discardCards(
            currentPlayer.id,
            currentPlayer.hand.length - 7
          )
        );
      }
      return newState;
    }
    default:
      return state;
  }
}
