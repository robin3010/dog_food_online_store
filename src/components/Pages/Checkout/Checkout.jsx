import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getCheckoutSelector } from '../../../redux/slices/checkoutSlice';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { placeholderStylesClasses } from '../../../utils/constants';
import { getCheckoutListQueryKey } from '../../../utils/queryUtils';
import { formatGoodsList } from '../../../utils/utils';
import { withQuery } from '../../HOCs/withQuery';
import { PlaceholderButtons } from '../../PlaceholderButtons/PlaceholderButtons';
import { CheckoutProductItem } from './CheckoutProductItem/CheckoutProductItem';
import { CheckoutSummary } from './CheckoutSummary/CheckoutSummary';
import {
  combineItemParams,
  getItemsIds,
} from '../../../utils/checkout&wishlistUtils/checkout&wishlistUtils';
import emptyCartPlaceholderImg from '../../../images/empty_cart.png';
import { CheckoutHandlingBar } from './CheckoutHandlingBar/CheckoutHandlingBar';

function CheckoutListReturn({ checkoutList, checkout }) {
  if (!checkout.length) {
    return (
      <>
        <h3 className="mb-3">Корзина</h3>
        <div className="card px-3 py-4" style={{ fontSize: '.875rem' }}>
          <div className={placeholderStylesClasses}>
            <div className="mb-3">
              <img src={emptyCartPlaceholderImg} className="w-75 mb-3 opacity-75" alt="" />
              <h3 className="mb-3">
                Корзина пуста
              </h3>
              <h5>
                Посмотрите предложения в каталоге
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
      <h3 className="mb-3">Корзина</h3>
      <div className="row g-4" style={{ fontSize: '.875rem' }}>
        <div className="col-12 col-lg-9">
          <CheckoutHandlingBar checkoutList={checkoutList} />
          <div className="row gy-3">
            {checkoutList.map((item) => (
              <CheckoutProductItem key={item.id} item={{ ...item }} />
            ))}
          </div>
        </div>
        <CheckoutSummary checkoutList={checkoutList} />
      </div>
    </>
  );
}

const CheckoutListReturnWithQuery = withQuery(CheckoutListReturn);

export function Checkout() {
  const checkout = useSelector(getCheckoutSelector);
  const authToken = useSelector(getAuthTokenSelector);

  const checkoutIds = getItemsIds(checkout);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: getCheckoutListQueryKey(checkoutIds),
    queryFn: () => shopApi.getGoodsByIds(checkoutIds, authToken),
    enabled: !!authToken,
    keepPreviousData: true,
  });

  const checkoutList = data
    ? formatGoodsList(data).filter((item) => checkoutIds.includes(item.id))
    : [];

  const checkoutListFormatted = (
    checkoutList
    && combineItemParams(checkoutList, checkout)
  );
  // console.log({ checkoutListFormatted });

  return (
    <CheckoutListReturnWithQuery
      checkoutList={checkoutListFormatted}
      checkout={checkout}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
