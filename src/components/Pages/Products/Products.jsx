import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getFiltersSelector, setTagsCollection } from '../../../redux/slices/filtersSlice';
import { getGoodsSelector, setGoodsList } from '../../../redux/slices/goodsSlice';
import { getUserDataSelector } from '../../../redux/slices/userSlice';
import { getGoodsListQueryKey } from '../../../utils/queryUtils';
import { Filters } from '../../Filters/Filters';
import { getFilteredByTags } from '../../Filters/utils/utils';
import { withQuery } from '../../HOCs/withQuery';
import { ProductItem } from '../../ProductItem/ProductItem';

function ProductsReturn({ goods, search }) {
  const placeholderClasses = `
  d-flex
  flex-column
  justify-content-center
  align-items-center
  m-auto
  text-center`;

  if (!goods.length) {
    if (search) {
      return (
        <div className={placeholderClasses}>
          <h2 className="mb-3">
            Ничего не нашлось... :(
          </h2>
          <h4>
            попробуйте изменить запрос
          </h4>
        </div>
      );
    }

    return (
      <div className={placeholderClasses}>
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
  // <section className="bg-body-secondary">
  // <div className="container p-3 p-md-4 p-lg-5">
    <div className="row row-cols row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
      {goods.map((item) => (
        <ProductItem key={item._id} item={{ ...item }} />
      ))}
      <div className="col me-auto" />
    </div>
  // </div>
  // </section>
  );
}

const ProductsReturnWithQuery = withQuery(ProductsReturn);

export function Products() {
  console.log('Render Products');

  const { authToken } = useSelector(getUserDataSelector);
  const { search, tagsSelected } = useSelector(getFiltersSelector);
  const { list: goods } = useSelector(getGoodsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const {
    isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getGoodsListQueryKey(search),
    queryFn: () => shopApi.getGoodsList(),
    enabled: authToken !== '',
    onSuccess: (res) => {
      dispatch(setTagsCollection(res));
      dispatch(setGoodsList(res));
    },
  });

  const filteredData = goods && getFilteredByTags(goods, tagsSelected);

  return (
    <section className="bg-body-secondary flex-grow-1">
      <div className="container p-3 p-md-4 py-lg-5">
        <Filters />
        <ProductsReturnWithQuery
          goods={filteredData}
          search={!!search}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </div>
    </section>
  );
}
