import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getFiltersSelector, setTagsCollection } from '../../../redux/slices/filtersSlice';
import { getGoodsListSelector, setGoodsList } from '../../../redux/slices/goodsSlice';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { getGoodsListQueryKey } from '../../../utils/queryUtils';
import { Filters } from '../../Filters/Filters';
import { getFilteredByTags } from '../../Filters/filterUtils/filterUtils';
import { withQuery } from '../../HOCs/withQuery';
import { ProductItem } from '../../ProductItem/ProductItem';

function ProductsReturn({ goods, filters }) {
  const placeholderStylesClasses = `
  d-flex
  flex-column
  justify-content-center
  align-items-center
  m-auto
  text-center`;

  if (!goods.length) {
    if (filters) {
      return (
        <div className={placeholderStylesClasses}>
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
      <div className={placeholderStylesClasses}>
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
    <div className="row row-cols row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
      {goods.map((item) => (
        <ProductItem key={item.id} item={{ ...item }} />
      ))}
      <div className="col me-auto" />
    </div>
  );
}

const ProductsReturnWithQuery = withQuery(ProductsReturn);

export function Products() {
  console.log('Render Products');

  const authToken = useSelector(getAuthTokenSelector);
  const { search, tagsSelected } = useSelector(getFiltersSelector);
  const goods = useSelector(getGoodsListSelector);
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
    enabled: !!authToken,
    onSuccess: (res) => {
      dispatch(setTagsCollection(res));
      dispatch(setGoodsList(res));
      // if (lastSort) {
      //   dispatch(sortGoodsList(lastSort));
      // }
    },
  });

  console.log({ authToken }, { 'shopApi.authToken': shopApi.authToken });

  // let filteredData = goods;

  // // console.log({ goods, filteredData, isLoading });

  // useEffect(() => {
  //   if (goods.length) {
  //     // const sortedData = lastSort ? sortGoodsList(lastSort) : goods;
  //     const sortedData = (function sortData() {
  //       if (lastSort) {
  //         dispatch(sortGoodsList(lastSort));
  //         return goods;
  //       }
  //       return goods;
  //     }());

  //     console.log('use effect', { goods, sortedData });

  //     filteredData = sortedData && getFilteredByTags(sortedData, tagsSelected);
  //     console.log('use effect', { goods, filteredData });
  //   }

  //   // let sortedData = goods;
  //   // if (lastSort) {
  //   //   sortedData = goods && sortGoodsList(goods, lastSort);
  //   // }
  //   // filteredData = sortedData && getFilteredByTags(sortedData, tagsSelected);
  // }, []);

  // console.log({ goods, filteredData, isLoading });
  // const filteredData = goods && getFilteredByTags(goods, tagsSelected);

  // (function sortData() {
  //   if (lastSort) {
  //     dispatch(sortGoodsList(lastSort));
  //     return goods;
  //   }
  //   return goods;
  // }());
  // console.log({ goods });

  const filteredData = goods && getFilteredByTags(goods, tagsSelected);

  return (
    <section className="bg-body-secondary flex-grow-1">
      <div className="container p-3 p-md-4 py-lg-5">
        <Filters />
        <ProductsReturnWithQuery
          goods={filteredData}
          filters={{ search: !!search, tagsSelected: !!tagsSelected.length }}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </div>
    </section>
  );
}
