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
