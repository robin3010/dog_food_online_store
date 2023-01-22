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

  console.log({ goods });
  if (isLoading) return <p>загрузка...</p>;

  if (!goods) {
    return <p>Пусто...</p>;
  }

  return (
    <div className="d-flex
      flex-column
      justify-content-center
      align-items-center
      m-auto
      text-center"
    >
      <h1>Products Page</h1>

      {goods.map((item) => (
        <ProductItem key={item._id} item={{ ...item }} />
      ))}

    </div>
  );
}
