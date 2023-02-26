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

export const sortGoods = (goods, condition, sortByPriceType) => {
  if (!condition) return goods;
  if (sortByPriceType === productParams.price_up) {
    return goods.sort((a, b) => calcCondition(a, condition) - calcCondition(b, condition));
  }
  return goods.sort((a, b) => calcCondition(b, condition) - calcCondition(a, condition));
};

export const getGoodsSuffix = (count) => {
  const lastNum = count % 10;
  const lastTwoNum = count % 100;
  if (lastTwoNum > 10 && lastTwoNum < 20) return ' товаров';
  if (lastNum > 1 && lastNum < 5) return ' товара';
  if (lastNum === 1) return ' товар';
  return ' товаров';
};

export const removeExtraWhitespaces = (value) => value.trim().replace(/\s{2,}/g, '');
