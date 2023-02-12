import { productParams } from './constants';

export const calcCondition = (item, condition) => {
  const value = item[condition];

  const getAvgRating = () => {
    const ratesArray = item.reviews.map((el) => el[condition]);

    const avgRating = ratesArray.reduce((acc, curr) => acc + curr, 0) / item.reviews.length || 0;
    return avgRating;
  };

  switch (condition) {
    case productParams.price:
      if (item.discount) {
        return value - (value / (item.discount));
      }
      return value;

    case productParams.discount:
      return +value;

    case productParams.rating:
      return getAvgRating();

    default: return value.length;
  }
};

export const formatPrice = (price) => price?.toLocaleString('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
  // minimumFractionDigits: 0,
});

export const formatGoodsList = (list) => list.map(({ _id: id, ...rest }) => ({ id, ...rest }));

export const getCheckoutItemParams = (itemId, checkout) => checkout
  .find((elem) => elem.id === itemId);
