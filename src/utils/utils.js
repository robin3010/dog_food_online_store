import { productParams } from './constants';
import defaultAvatar from '../images/default_avatar.png';

export const getAvgRating = (reviews) => {
  const ratesArray = reviews.map((el) => el[productParams.rating]);

  const avgRating = ratesArray
    .reduce((acc, curr) => acc + Math.round(curr), 0) / reviews.length || 0;
  return avgRating;
};

// Функция преобразования значений по требуемому условию
// для дальнейшей сортировки массива данных по этому условию
export const calcCondition = (item, condition) => {
  const value = item[condition];

  switch (condition) {
    case productParams.price:
      if (item.discount) {
        return value - ((value * item.discount) / 100);
      }
      return value;

    case productParams.discount:
      return +value;

    case productParams.rating:
      return getAvgRating(item.reviews);

    default:
      return value.length;
  }
};

export const formatPrice = (price) => price?.toLocaleString('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
  // minimumFractionDigits: 0,
});


// Переименование ключа id;
// приведение значений ключа discount к диапазону [0 - 100];
// округление оценок
export const formatGoods = (data) => {
  const getFormatted = ({
    _id: id, discount, reviews, ...rest
  }) => {
    const discountValue = +discount > 100 ? 100 : +discount;

    return ({
      id,
      discount: discountValue,
      reviews: roundRating(reviews),
      ...rest,
    });
  };

  if (Array.isArray(data)) {
    return data.map((item) => getFormatted(item));
  }
  return getFormatted(data);
};

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

export const setAvatar = (avatar) => {
  const defaultApiAvatar = 'https://react-learning.ru/image-compressed/default-image.jpg';
  if (avatar === defaultApiAvatar || !avatar) {
    return defaultAvatar;
  }
  return avatar;
};

export const renameIdKey = (data) => {
  const getRenamed = ({ _id: id, ...rest }) => ({
    id,
    ...rest,
  });

  if (Array.isArray(data)) {
    return data.map((item) => getRenamed(item));
  }
  return getRenamed(data);
};
