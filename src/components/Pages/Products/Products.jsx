import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { useAuthTokenContext } from '../../../context/AuthTokenContext';
import { ProductItem } from '../../ProductItem/ProductItem';

export function Products() {
  const { authToken } = useAuthTokenContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const { data: goods, isLoading } = useQuery({
    queryKey: ['goodsListFetch'],
    queryFn: () => shopApi.getGoodsList(),
  });

  if (isLoading) return <p>загрузка...</p>;

  if (!goods) {
    return <p>Пусто...</p>;
  }

  return (
    <div className="container p-5">
      <div className="row row-cols row-cols-xxl-4 row-cols-lg-3 row-cols-md-1 row-cols-sm-1 g-4">
        {goods.map((item) => (
          <ProductItem key={item._id} item={{ ...item }} />
        ))}
        <div className="col me-auto" />
      </div>

    </div>
  );
}
