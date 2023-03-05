import { productParams } from '../../../utils/constants';

export const conditionsSet = {
  [productParams.likes]: 'По популярности',
  [productParams.created_at]: 'По новизне',
  [productParams.price]: 'По цене',
  [productParams.reviews]: 'По отзывам',
  [productParams.rating]: 'По рейтингу',
  [productParams.discount]: 'По размеру скидки',
};
