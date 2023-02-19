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
import { CheckoutCheckBar } from './CheckoutCheckBar/CheckoutCheckBar';
import { CheckoutProductItem } from './CheckoutProductItem/CheckoutProductItem';
import { CheckoutSummary } from './CheckoutSummary/CheckoutSummary';
import { addCheckoutItemParams, getCheckoutIds } from './checkoutUtils/checkoutUtils';
import emptyCartPlaceholderImg from '../../../images/empty_cart.png';

function CheckoutListReturn({ checkoutList, checkout }) {
  if (!checkout.length) {
    return (
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
    );
  }
  return (
    <div className="row g-4" style={{ fontSize: '.875rem' }}>
      <div className="col-12 col-lg-9">
        <CheckoutCheckBar checkoutList={checkoutList} />
        <div className="row gy-3">
          {checkoutList.map((item) => (
            <CheckoutProductItem key={item.id} item={{ ...item }} />
          ))}
        </div>
      </div>
      <CheckoutSummary checkoutList={checkoutList} />
    </div>
  );
}

const CheckoutListReturnWithQuery = withQuery(CheckoutListReturn);

export function Checkout() {
  const checkout = useSelector(getCheckoutSelector);
  const authToken = useSelector(getAuthTokenSelector);

  const checkoutIds = getCheckoutIds(checkout);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data: checkoutList, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: getCheckoutListQueryKey(checkoutIds),
    queryFn: () => shopApi.getGoodsByIds(checkoutIds, authToken),
    enabled: !!authToken,
    keepPreviousData: true,
    onSuccess: (res) => res.filter((item) => !checkoutIds.includes(item.id)),
  });

  // const checkoutList = data && data.filter((item) => !checkoutIds.includes(item.id));
  // console.log({ test, checkoutIds });

  const checkoutListFormatted = (
    checkoutList?.length
    && addCheckoutItemParams(formatGoodsList(checkoutList), checkout)
  );
  console.log({ checkoutListFormatted });

  return (
    <section className="bg-body-secondary flex-grow-1">
      <div className="container p-3 p-md-4 py-lg-5">
        <CheckoutListReturnWithQuery
          checkoutList={checkoutListFormatted}
          checkout={checkout}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </div>
    </section>
  );
}
