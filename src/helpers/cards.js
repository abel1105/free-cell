import _ from 'lodash';

export const CARD_TYPES = ['spade', 'diamond', 'club', 'heart'];

export const getRandomCardsStack = () => {
  const allCards = [];
  CARD_TYPES.forEach(type => {
    for (let i = 1; i <= 13; i++) {
      allCards.push({ type, number: i });
    }
  });

  const suffleCards = _.shuffle(allCards);
  return _.flatten(
    _.chunk(suffleCards, 28).map((chunk, i) => {
      return _.chunk(chunk, i === 0 ? 7 : 6);
    })
  );
};
