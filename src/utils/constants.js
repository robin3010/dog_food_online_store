import { initState } from '../redux/initState';

export const productParams = {
  likes: 'likes',
  price: 'price',
  reviews: 'reviews',
  rating: 'rating',
  discount: 'discount',
};

const sliceKeys = Object.keys(initState).reduce((acc, curr) => ({ ...acc, [curr]: curr }), {});

const { user, checkout } = sliceKeys;

export const webStorageSliceNames = [user, checkout];
