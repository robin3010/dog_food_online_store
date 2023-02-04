import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getUserDataSelector } from '../../../redux/slices/userSlice';
// import { useUserDataContext } from '../../../context/UserDataContext';
import { withQuery } from '../../HOCs/withQuery';
import { ProductItem } from '../../ProductItem/ProductItem';

function ProductsReturn({ goods }) {
  if (!goods) {
    return (
      <div className="d-flex
      flex-column
      justify-content-center
      align-items-center
      m-auto
      text-center"
      >
        <h2 className="mb-3">
          Все товары закончились... :(
        </h2>
        <h4>
          ...но мы везём новые,
          <br />
          загляните чуть позже!

        </h4>
      </div>
    );
  }

  return (
    <section className="bg-body-secondary">
      <div className="container p-3 p-md-4 p-lg-5">
        <div className="row row-cols row-cols-xxl-4 row-cols-lg-3 row-cols-md-1 row-cols-sm-1 g-4">
          {goods.map((item) => (
            <ProductItem key={item._id} item={{ ...item }} />
          ))}
          <div className="col me-auto" />
        </div>
      </div>
    </section>
  );
}

const ProductsReturnWithQuery = withQuery(ProductsReturn);

export function Products() {
  // const { authToken } = useUserDataContext();
  const { authToken } = useSelector(getUserDataSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    data: goods, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['goodsListFetch'],
    queryFn: () => shopApi.getGoodsList(),
    enabled: authToken !== '',
  });

  return (
    <ProductsReturnWithQuery
      goods={goods}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
