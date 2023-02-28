import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  useParams,
} from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { productParams } from '../../../utils/constants';
import { getProductDetailQueryKey } from '../../../utils/queryUtils';
import {
  calcCondition, formatGoods,
} from '../../../utils/utils';
import { AddToCartButton } from '../../Buttons/AddToCartButton/AddToCartButton';
import { WishlistButton } from '../../Buttons/WishlistButton/WishlistButton';
import { withQuery } from '../../HOCs/withQuery';
import {
  ProductAvailableQuantity,
} from '../../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductPrice } from '../../ProductElements/ProductPrice/ProductPrice';

function ProductDetailReturn({ item, isReviewsOpen }) {
  const {
    author,
    available,
    description,
    discount,
    id,
    name,
    pictures,
    price,
    reviews,
    stock,
    wight,
  } = item;


  return (
    <>
      <h3>{name}</h3>
      <div className="row row-cols-1 g-0">
        <div className="card mb-3">
          <div className="row row-cols-1 g-0 gx-lg-4 product__card product__detail">
            <div className="col-12 col-lg">
              <div className="product__card-img rounded d-block mx-auto my-4 mx-lg-0 ms-lg-4">
                <img src={pictures} alt="..." />
              </div>
            </div>
            <div className="col-12 col-lg-8 h-100">
              <div className="card-body text-start p-4 ps-lg-0">
                <p className="card-text">{description}</p>
                <div>
                  {/* <span>{`likes ${calcCondition(item, 'likes')}`}</span> */}
                  {/* <span>{`discount ${calcCondition(item, 'discount')}`}</span> */}
                </div>
              </div>
              <footer className="px-4 pb-4 ps-lg-0">
                <ProductAvailableQuantity available={available} stock={stock} />
                <div className="d-flex flex-wrap flex-sm-nowrap">
                  <div className="d-flex w-100 me-auto p-1 ps-0">
                    <div
                      className="d-flex align-items-center product__card-price_bg
                        border border-tertiary rounded w-100"
                    >
                      <div className="ms-2 py-2 py-sm-0 fw-semibold">
                        <ProductPrice price={price} discount={discount} />
                      </div>
                      <span className="ms-auto me-2">{wight}</span>
                    </div>
                  </div>
                  <WishlistButton id={id} />
                  <AddToCartButton item={item} textual />
                </div>
                <div className="pt-3">
                  Продавец:
                  <img
                    src={setAvatar(author.avatar)}
                    className="vendor__logo rounded-circle d-inline-block ms-2 me-1"
                    alt="..."
                  />
                  <b className="align-middle">{author.name}</b>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProductDetailReturnWithQuery = withQuery(ProductDetailReturn);

export function ProductDetail() {
  const { productId } = useParams();
  const authToken = useSelector(getAuthTokenSelector);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: getProductDetailQueryKey(productId),
    queryFn: () => shopApi.getProductById(productId, authToken),
  });

  const item = data && formatGoods(data);

  return (
    <ProductDetailReturnWithQuery
      item={item}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
