import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getCheckoutSelector } from '../../../redux/slices/checkoutSlice';
import { getUserDataSelector } from '../../../redux/slices/userSlice';
import { getCheckoutListQueryKey } from '../../../utils/queryUtils';
import { formatGoodsList } from '../../../utils/utils';
import { Loader } from '../../Loaders/Loader';
import loginStyles from '../Login/Login.module.css';

import { CheckoutProductItem } from './CheckoutProductItem/CheckoutProductItem';

export function Checkout() {
  const checkout = useSelector(getCheckoutSelector);
  const { authToken } = useSelector(getUserDataSelector);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutIds = checkout.map((elem) => elem.id);

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data: checkoutList, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getCheckoutListQueryKey(checkoutIds),
    queryFn: () => shopApi.getGoodsByIds(checkoutIds),
    enabled: !!authToken,
  });

  console.log(getCheckoutListQueryKey(checkoutIds));

  // const checkoutListFormatted = checkoutList && formatGoodsList(checkoutList);
  const checkoutListFormatted = !isLoading && formatGoodsList(checkoutList);
  console.log({ checkoutListFormatted });

  if (isError) {
    return (
      <div className="container p-3 p-md-4 p-lg-5 d-flex
      flex-column
      justify-content-center
      align-items-center
      m-auto
      text-center"
      >
        <h5 className="text-break mb-3">
          {error.message || 'Ошибка. Попробуйте позже'}
        </h5>
        <button
          type="button"
          onClick={refetch}
          className={`btn ${loginStyles['btn-login-primary']}`}
          disabled={isLoading}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <section className="bg-body-secondary flex-grow-1">
      <div
        className="container p-3 p-md-4 py-lg-5"
        style={{ fontSize: '.875rem' }}
      >
        <div className="row g-4">
          <div className="col-9">
            <div className="row gy-3">
              {checkoutListFormatted.map((item) => (
                <CheckoutProductItem key={item.id} item={{ ...item }} />
              ))}
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                asdasdadsasd
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
