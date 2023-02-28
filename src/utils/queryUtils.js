export const getGoodsListQueryKey = (search, tags, sort) => [
  'goodsListFetch',
  search,
  tags,
  !!sort,
];

export const getCheckoutListQueryKey = (ids) => [
  'checkoutListFetch',
  { ...ids },
];

export const getWishlistQueryKey = (ids) => [
  'wishlistFetch',
  { ...ids },
];

export const getProductDetailQueryKey = (productId) => [
  'productDetailFetch',
  productId,
];

