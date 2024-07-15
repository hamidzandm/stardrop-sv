import items from '@/items';

const getNearestItemKeys = (preferences) => {
  const categories = ['like', 'love', 'dislike', 'hate'];
  const result = {};

  categories.forEach((category) => {
    if (preferences[category]) {
      result[category] = preferences[category].map((item) => {
        const nearestKeys = item.nearestItems.map((nearestItem) => {
          const itemKey = Object.keys(items).find(key => items[key] === nearestItem);
          return itemKey ? Number(itemKey) : null;
        }).filter(key => key !== null);

        return {
          item: item.item,
          nearestKeys
        };
      });
    }
  });

  return result;
};

export default getNearestItemKeys;
