import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getSearchFilterSelector, setTagsCollection } from '../../../redux/slices/filtersSlice';
import {
  getGoodsSelector,
  setGoodsList,
  sortGoodsList,
} from '../../../redux/slices/goodsSlice';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import {
  placeholderStylesClasses,
  productParams,
  searchParamsKeys,
} from '../../../utils/constants';
import { getGoodsListQueryKey } from '../../../utils/queryUtils';
import { Filters } from '../../Filters/Filters';
import { getFilteredByTags } from '../../Filters/filterUtils/filterUtils';
import { withQuery } from '../../HOCs/withQuery';
import { PlaceholderButtons } from '../../PlaceholderButtons/PlaceholderButtons';
import { ProductItem } from '../../ProductItem/ProductItem';
import noFilterResultsImg from '../../../images/result_not_found.png';

function ProductsReturn({ goods, filters: { search, tags }, fetchStatus }) {
  const isFilters = !!search || !!tags.length;
  const searchPhrase = (
    <>
      {'По запросу '}
      <b className="text-break px-3">
        «
        {search}
        »
      </b>
    </>
  );

  if (!goods.length) {
    if (isFilters) {
      return (
        <div className="card px-3 py-4">
          <div className={placeholderStylesClasses}>
            <div className="mb-3">
              <img src={noFilterResultsImg} className="w-75" alt="" />
              <h2 className="mb-3 px-3">
                {search ? searchPhrase : 'Похоже,'}
                {' ничего не найдено'}
              </h2>
              <h4>
                Попробуйте изменить запрос
              </h4>
            </div>
            <PlaceholderButtons filters={isFilters} list={goods} />
          </div>
        </div>
      );
    }

    if (fetchStatus !== 'fetching') {
      return (
        <div className="card px-3 py-4">
          <div className={placeholderStylesClasses}>
            <div className="mb-3">
              <h2 className="mb-3">
                Все товары закончились... :(
              </h2>
              <h4>
                ...но мы везём новые,
                <br />
                загляните чуть позже!
              </h4>
            </div>
            <PlaceholderButtons filters={isFilters} list={goods} />
          </div>
        </div>
      );
    }
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
  const [searchParams] = useSearchParams();
  const search = useSelector(getSearchFilterSelector);
  const goods = useSelector(getGoodsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken]);

  const tagsQuery = searchParams.getAll(searchParamsKeys.tags);
  const tagsSelected = tagsQuery[0] ? tagsQuery : [];
  const lastSort = searchParams.get(searchParamsKeys.sort) ?? '';

  const applyFilters = (fetchResponse) => {
    dispatch(setTagsCollection(fetchResponse));
    // dispatch(setGoodsList([]));
    dispatch(setGoodsList(fetchResponse));
    if (lastSort) {
      let condition = lastSort;
      const sortFilterName = lastSort;
      if (lastSort === productParams.price_down || lastSort === productParams.price_up) {
        condition = productParams.price;
      }
      console.log({ condition, sortFilterName });
      dispatch(sortGoodsList({ condition, sortFilterName }));
    }
  };

  const {
    isLoading, isError, error, refetch, isFetching, fetchStatus,
  } = useQuery({
    queryKey: getGoodsListQueryKey(search, tagsSelected, lastSort),
    queryFn: () => shopApi.getGoodsList(authToken),
    enabled: !!authToken,
    keepPreviousData: true,
    onSuccess: (res) => applyFilters(res),
  });

  console.log(getGoodsListQueryKey(search, tagsSelected, lastSort));

  const filteredData = goods && getFilteredByTags(goods, tagsSelected);

  return (
    <section className="bg-body-secondary flex-grow-1">
      <div className="container p-3 p-md-4 py-lg-5">
        <Filters />
        <ProductsReturnWithQuery
          goods={filteredData}
          filters={{ search, tags: tagsSelected }}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          refetch={refetch}
          fetchStatus={fetchStatus}
        />
      </div>
    </section>
  );
}
