export const getGoodsListQueryKey = (search) => ['goodsListFetch', search];

export const getCheckoutListQueryKey = (ids) => ['checkoutListFetch', { ...ids }];
