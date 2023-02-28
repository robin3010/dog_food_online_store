import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { placeholderStylesClasses } from '../../../utils/constants';
import { getWishlistQueryKey } from '../../../utils/queryUtils';
import { formatGoods } from '../../../utils/utils';
import { withQuery } from '../../HOCs/withQuery';
import { PlaceholderButtons } from '../../Buttons/PlaceholderButtons/PlaceholderButtons';
import emptyWishlistPlaceholderImg from '../../../images/empty_wishlist.png';
import { getWishlistSelector } from '../../../redux/slices/wishlistSlice';
import { WishlistProductItem } from './WishlistProductItem/WishlistProductItem';
import { WishlistHandlingBar } from './WishlistHandlingBar/WishlistHandlingBar';
import {
  combineItemParams,
  getItemsIds,
} from '../../../utils/checkout&wishlistUtils/checkout&wishlistUtils';

function WishlistReturn({ wishlistFetched, wishlist }) {
  if (!wishlist.length) {
    return (
      <>
        <h3 className="mb-3">Избранное</h3>
        <div className="card px-3 py-4" style={{ fontSize: '.875rem' }}>
          <div className={placeholderStylesClasses}>
            <div className="mb-3">
              <img src={emptyWishlistPlaceholderImg} className="w-75 mb-3 opacity-75" alt="" />
              <h5 className="mb-3">
                В списке пока нет ни одного избранного товара
              </h5>
            </div>
            <PlaceholderButtons filters={false} list />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h3 className="mb-3">Избранное</h3>
      <div className="row g-4" style={{ fontSize: '.875rem' }}>
        <div className="col-12">
          <WishlistHandlingBar wishlistFetched={wishlistFetched} />
          <div className="row gy-3">
            {wishlistFetched.map((item) => (
              <WishlistProductItem key={item.id} item={{ ...item }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const WishlistReturnWithQuery = withQuery(WishlistReturn);

export function Wishlist() {
  const wishlist = useSelector(getWishlistSelector);
  const authToken = useSelector(getAuthTokenSelector);

  const wishlistIds = getItemsIds(wishlist);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: getWishlistQueryKey(wishlistIds),
    queryFn: () => shopApi.getGoodsByIds(wishlistIds, authToken),
    enabled: !!authToken,
    keepPreviousData: true,
  });

  const wishlistFetched = data
    ? formatGoods(data).filter((item) => wishlistIds.includes(item.id))
    : [];

  const wishlistFormatted = (
    wishlistFetched
    && combineItemParams(formatGoodsList(wishlistFetched), wishlist)
  );
  // console.log({ wishlistFormatted });

  return (
    <WishlistReturnWithQuery
      wishlistFetched={wishlistFormatted}
      wishlist={wishlist}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
