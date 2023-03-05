import { defaultImages, productParams } from './constants';

export const setImage = (image, type) => {
  const defaultApiImage = 'https://react-learning.ru/image-compressed/default-image.jpg';
  if (image === defaultApiImage || !image) {
    return defaultImages[type];
  }
  return image;
};

export const getAvgRating = (reviews) => {
  const ratesArray = reviews.map((el) => el.rating);

  const avgRating = ratesArray
    .reduce((acc, curr) => acc + Math.round(curr), 0) / reviews.length || 0;
  return avgRating && parseFloat(avgRating.toFixed(2));
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
    case productParams.created_at:
      return new Date(value).getTime();

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
});

export const formatDate = (time) => new Date(time)
  .toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' })
  .replace(/г\.,/, 'в');

export const roundRating = (reviews) => reviews.map(({ rating, ...review }) => ({
  rating: rating.toFixed(),
  ...review,
}));

// Переименование ключа id;
// приведение значений ключа discount к диапазону [0 - 100];
// округление оценок
// добавление переменной со средней оценкой товара
export const formatGoods = (data) => {
  const getFormatted = ({
    _id: id, discount, reviews, pictures, ...rest
  }) => {
    const discountValue = +discount > 100 ? 100 : +discount;
    const reviewsRoundedRating = roundRating(reviews);

    return ({
      id,
      discount: discountValue,
      reviews: reviewsRoundedRating,
      avgRating: getAvgRating(reviewsRoundedRating),
      clientImage: setImage(pictures, defaultImages.type.product),
      ...rest,
    });
  };

  if (Array.isArray(data)) {
    const dataArrayFormatted = data.map((item) => {
      if (item?.err) {
        return item;
      }
      return getFormatted(item);
    });
    return dataArrayFormatted;
  }
  if (data.err) {
    console.log('bad item');
    return data;
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
