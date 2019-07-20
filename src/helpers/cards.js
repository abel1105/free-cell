import _ from 'lodash';

export const isMatch = (parent, child) => {
  const { type: parentType, number: parentNumber } = parent;
  const { type: childType, number: childNumber } = child;

  if (childNumber !== parentNumber - 1) {
    return false;
  }
  return isOpposite(parentType, childType);
};

export const isOpposite = (origin, target) => {
  if (origin === 'spade' || origin === 'club') {
    return target === 'diamond' || target === 'heart';
  } else {
    return target === 'spade' || target === 'club';
  }
};

export const isDraggable = stack => {
  const item = stack[0];
  // console.group();
  if (item && item.items && item.items.length) {
    // console.log('isDraggable', item);
    const childIsDraggable = isDraggable(item.items);
    if (childIsDraggable) {
      // console.log('isDraggable', item, item.items)
      if (isMatch(item, item.items[0])) {
        // console.groupEnd();
        return true;
      }
    }
    // console.groupEnd();
    return false;
  }
  // console.log('isDraggable', JSON.stringify(stack[0]));
  // console.groupEnd();
  return true;
};

export const CARD_TYPES = ['spade', 'heart', 'club', 'diamond'];

export const getRandomCardsStack = () => {
  const allCards = [];
  CARD_TYPES.forEach(type => {
    for (let i = 1; i <= 13; i++) {
      allCards.push({ type, number: i });
    }
  });

  const suffleCards = _.shuffle(allCards);

  const flattenCard = _.flatten(
    _.chunk(suffleCards, 28).map((chunk, i) => {
      return _.chunk(chunk, i === 0 ? 7 : 6);
    })
  );

  // return flattenCard;

  return flattenCard.map(stack => {
    return [
      {
        items: createStack(stack)
      }
    ];
  });
};

export const createStack = stack => {
  let first = [];
  if (stack.length) {
    first.push(stack.shift());
    first[0].items = createStack(stack);
  }
  return first;
};
