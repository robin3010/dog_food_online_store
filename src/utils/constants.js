import defaultAvatar from '../images/default_avatar.png';
import productNoPhoto from '../images/product_nophoto.png';

const defaultApiImage = 'https://react-learning.ru/image-compressed/default-image.jpg';

export const productParams = {
  likes: 'likes',
  price: 'price',
  price_up: 'price_up',
  price_down: 'price_down',
  reviews: 'reviews',
  rating: 'rating',
  discount: 'discount',
  created_at: 'created_at',
};

export const searchParamsKeys = {
  q: 'q',
  tags: 'tags',
  sort: 'sort',
};

export const placeholderStylesClasses = `
  d-flex
  flex-column
  justify-content-center
  align-items-center
  mx-lg-5
  text-center`;

export const defaultImages = {
  type: {
    avatar: 'avatar',
    product: 'product',
  },
  avatar: defaultAvatar,
  product: productNoPhoto,
  api: defaultApiImage,
};
