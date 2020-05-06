import { actionTypes } from 'game/core';
import { getCardById } from 'utils/deck';

const messageTypes = {
  playCard: '@play-card',
  endTurn: '@end-turn',
};

const messageCreators = {
  playCard(playerId, playerName, cardIdPlayed) {
    return {
      actor: {
        id: playerId,
        name: playerName,
      },
      type: messageTypes.playCard,
      payload: {
        cardPlayed: cardIdPlayed,
      },
      created_at: new Date(),
    };
  },
  endTurn(playerId, playerName) {
    return {
      actor: {
        id: playerId,
        name: playerName,
      },
      type: messageTypes.endTurn,
      payload: {},
      created_at: new Date(),
    };
  },
};

export const actionToMessage = (action, playerName) => {
  switch (action.type) {
    case actionTypes.endTurn: {
      const {
        data: { playerId },
      } = action;
      return messageCreators.endTurn(playerId, playerName);
    }
    case actionTypes.playCard: {
      const {
        data: { playerId, card },
      } = action;
      return messageCreators.playCard(playerId, playerName, card.id);
    }
    default: {
      return { type: '@bad-type' };
    }
  }
};

export const messageInterpreter = (message, { requesterId }) => {
  switch (message.type) {
    case messageTypes.playCard: {
      const {
        actor: { id, name },
        payload: { cardPlayed },
      } = message;
      const card = getCardById(cardPlayed);
      return `${requesterId === id ? 'you' : name} played a ${card.type} card`;
    }
    case messageTypes.endTurn: {
      const {
        actor: { id, name },
      } = message;
      return requesterId === id
        ? 'you ended your turn'
        : `${name} ended their turn`;
    }
    default: {
      return 'Good luck!';
    }
  }
};
