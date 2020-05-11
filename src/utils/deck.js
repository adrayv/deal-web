import _ from 'lodash';

export const rentAmounts = {
  green: [2, 4, 7],
  black: [1, 2, 3, 4],
  blue: [3, 8],
  purple: [1, 2, 4],
  red: [2, 3, 6],
  yellow: [2, 4, 6],
  brown: [1, 2],
  orange: [1, 3, 5],
  mint: [1, 2],
  sky: [1, 2, 3],
};

export const numToComplete = {
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

const types = {
  cash: {
    1: 6,
    2: 5,
    3: 3,
    4: 3,
    5: 2,
    10: 1,
  },
  houses: {
    count: 3,
    value: 3,
  },
  hotels: {
    count: 2,
    value: 4,
  },
  // rent: {
  //   'sky-brown': {
  //     value: 1,
  //     count: 2,
  //     colors: ['sky', 'brown'],
  //   },
  //   'black-mint': {
  //     value: 1,
  //     count: 2,
  //     colors: ['black', 'mint'],
  //   },
  //   'blue-green': {
  //     value: 1,
  //     count: 2,
  //     colors: ['blue', 'green'],
  //   },
  //   'yellow-red': {
  //     value: 1,
  //     count: 2,
  //     colors: ['yellow', 'red'],
  //   },
  //   'purple-orange': {
  //     value: 1,
  //     count: 2,
  //     colors: ['purple', 'orange'],
  //   },
  //   any: {
  //     value: 3,
  //     count: 3,
  //     colors: [
  //       'purple',
  //       'orange',
  //       'yellow',
  //       'red',
  //       'blue',
  //       'green',
  //       'black',
  //       'mint',
  //       'sky',
  //       'brown',
  //     ],
  //   },
  // },
  actions: {
    dealbreaker: {
      value: 5,
      count: 2,
    },
    'say-no': {
      value: 4,
      count: 3,
    },
    'pass-go': {
      value: 1,
      count: 10,
    },
    'sly-deal': {
      value: 3,
      count: 10,
    },
    'debt-collector': {
      value: 3,
      count: 3,
    },
    // misc: {
    //   'forced-deal': {
    //     value: 3,
    //     count: 3,
    //   },
    //   'double-rent': {
    //     value: 1,
    //     count: 2,
    //   },
    birthday: {
      value: 2,
      count: 3,
    },
    // },
  },
  properties: {
    special: {
      wild: {
        value: 0,
        count: 2,
        colors: 'any',
      },
      'blue-green': {
        value: 4,
        count: 1,
      },
      'sky-brown': {
        value: 1,
        count: 1,
      },
      'yellow-red': {
        value: 3,
        count: 2,
      },
      'purple-orange': {
        value: 2,
        count: 2,
      },
      'railroad-green': {
        value: 4,
        count: 1,
      },
      'railroad-sky': {
        value: 4,
        count: 1,
      },
      'railroad-mint': {
        value: 2,
        count: 1,
      },
    },
    regular: {
      purple: {
        value: 2,
        count: 3,
        names: ['virginia-ave', 'states-ave', 'st-charles'],
      },
      green: {
        value: 4,
        count: 3,
        names: ['pennsylvania', 'pacific', 'north-carolina'],
      },
      brown: {
        value: 1,
        count: 2,
        names: ['baltic', 'medditerranean'],
      },
      red: {
        value: 3,
        count: 3,
        names: ['illinois', 'kentucky', 'indiana'],
      },
      orange: {
        value: 2,
        count: 3,
        names: ['tennessee', 'new-york', 'st-james'],
      },
      blue: {
        value: 4,
        count: 2,
        names: ['boardwalk', 'park-place'],
      },
      yellow: {
        value: 3,
        count: 3,
        names: ['atlantic', 'marvin-gardens', 'ventnor-ave'],
      },
      sky: {
        value: 1,
        count: 3,
        names: ['oriental', 'connecticut', 'vermont'],
      },
      mint: {
        value: 2,
        count: 2,
        names: ['water-works', 'electric-company'],
      },
      black: {
        value: 2,
        count: 4,
        names: ['short-line', 'pennsylvania', 'bo', 'reading'],
      },
    },
  },
};

export const generateDeck = () => {
  const makeTypes = ([type, data]) => {
    if (type === 'cash') {
      return Object.entries(data).map(([denomination, count]) => {
        return [...new Array(count)].map((_, i) => {
          return {
            id: `cash-val-${denomination}-${i}`,
            type: 'cash',
            value: Number(denomination),
          };
        });
      });
    } else if (type === 'properties') {
      return Object.entries(data.regular).map(([color, propData]) => {
        return propData.names.map(name => ({
          id: `property-${color}-${name}`,
          type: 'property',
          name,
          color,
          value: propData.value,
        }));
      });
    } else if (type === 'actions') {
      return Object.entries(data).map(([actionName, actionData]) => {
        return [...new Array(actionData.count)].map((_, i) => {
          return {
            id: `action-${actionName}-${i}`,
            type: 'action',
            value: actionData.value,
            name: actionName,
          };
        });
      });
    } else if (type === 'rent') {
      return Object.entries(data).map(([rentName, rentData]) => {
        return [...new Array(rentData.count)].map((_, i) => {
          return {
            id: `rent-${rentName}-${i}`,
            type: 'rent',
            value: rentData.value,
            name: `rent-${rentName}`,
            colors: rentData.colors,
          };
        });
      });
    } else return null;
  };
  return _.flatMapDeep(Object.entries(types), makeTypes).filter(e => e);
};

const deck = generateDeck();

export const getCardById = cardId => {
  return deck.find(card => card.id === cardId);
};
