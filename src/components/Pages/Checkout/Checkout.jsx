import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getCheckoutSelector } from '../../../redux/slices/checkoutSlice';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { getCheckoutListQueryKey } from '../../../utils/queryUtils';
import { formatGoodsList } from '../../../utils/utils';
import { withQuery } from '../../HOCs/withQuery';
import { CheckoutCheckBar } from './CheckoutCheckBar/CheckoutCheckBar';
import { CheckoutProductItem } from './CheckoutProductItem/CheckoutProductItem';
import { CheckoutSummary } from './CheckoutSummary/CheckoutSummary';
import { addCheckoutItemParams, getCheckoutIds } from './checkoutUtils/checkoutUtils';

function CheckoutListReturn({ checkoutList }) {
  if (!checkoutList.length) return 'Пусто, однако';
  return (
    <div
      className="container p-3 p-md-4 py-lg-5"
      style={{ fontSize: '.875rem' }}
    >
      <div className="row g-4">
        <div className="col-12 col-md-9">
          <CheckoutCheckBar checkoutList={checkoutList} />
          <div className="row gy-3">
            {checkoutList.map((item) => (
              <CheckoutProductItem key={item.id} item={{ ...item }} />
            ))}
          </div>
        </div>
        <CheckoutSummary checkoutList={checkoutList} />
      </div>
    </div>
  );
}

const CheckoutListReturnWithQuery = withQuery(CheckoutListReturn);

export function Checkout() {
  const checkout = useSelector(getCheckoutSelector);
  const authToken = useSelector(getAuthTokenSelector);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data: checkoutList, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getCheckoutListQueryKey(getCheckoutIds(checkout)),
    queryFn: () => shopApi.getGoodsByIds(getCheckoutIds(checkout)),
    enabled: !!authToken,
  });

  const checkoutListFormatted = checkoutList?.length
    ? addCheckoutItemParams(formatGoodsList(checkoutList), checkout)
    : checkout;
  console.log({ checkoutListFormatted });

  return (
    <section className="bg-body-secondary flex-grow-1">
      <CheckoutListReturnWithQuery
        checkoutList={checkoutListFormatted}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    </section>
  );
}
