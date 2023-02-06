export const calcCondition = Symbol('calcCondition');

export const conditionsCollection = {
  likes: 'По популярности',
  price: 'По цене',
  reviews: 'По отзывам',
  rating: 'По рейтингу',
  discount: 'По размеру скидки',
  [calcCondition]: (item, condition) => {
    const value = item[condition];

    const getAvgRating = (elem, conditionValue) => {
      const ratesArray = elem.reviews.map((el) => el[conditionValue]);

      const avgRating = ratesArray.reduce((acc, curr) => acc + curr, 0) / elem.reviews.length || 0;
      return avgRating;
    };

    switch (condition) {
      case 'price':
        if (item.discount) {
          return value - (value / (item.discount));
        }
        return value;

      case 'discount':
        return +value;

      case 'rating':
        return getAvgRating(item, condition);

      default: return value.length;
    }
  },
};
