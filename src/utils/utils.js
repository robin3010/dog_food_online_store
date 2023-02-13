import { productParams } from './constants';

// Функция преобразования значений по требуемому условию
// для дальнейшей сортировки массива данных по этому условию
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
        return value - ((value * item.discount) / 100);
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

// Переименование ключа id; приведение значений ключа discount к диапазону [0 - 100]
export const formatGoodsList = (list) => list.map(({ _id: id, discount, ...rest }) => {
  const discountValue = +discount > 100 ? 100 : +discount;
  return ({
    id,
    discount: discountValue,
    ...rest,
  });
});

export const getCheckoutItemParams = (itemId, checkout) => checkout
  .find((elem) => elem.id === itemId);

export const sortGoods = (goods, cond, sortByPriceType) => {
  if (!cond) return goods;
  if (sortByPriceType === productParams.price_up) {
    return goods.sort((a, b) => calcCondition(a, cond) - calcCondition(b, cond));
  }
  return goods.sort((a, b) => calcCondition(b, cond) - calcCondition(a, cond));
};
