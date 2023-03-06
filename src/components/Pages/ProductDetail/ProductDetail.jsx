import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  NavLink, Outlet, useMatch, useNavigate, useParams,
} from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { defaultImages, productParams } from '../../../utils/constants';
import { getProductDetailQueryKey } from '../../../utils/queryUtils';
import {
  calcCondition, formatGoods, setImage,
} from '../../../utils/utils';
import { AddToCartButton } from '../../Buttons/AddToCartButton/AddToCartButton';
import { WishlistButton } from '../../Buttons/WishlistButton/WishlistButton';
import { withQuery } from '../../HOCs/withQuery';
import { ProductAvailableQuantity } from '../../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductDiscountBadge } from '../../ProductElements/ProductDiscountBadge/ProductDiscountBadge';
import { ProductPrice } from '../../ProductElements/ProductPrice/ProductPrice';
import { ProductReviewsCount } from '../../ProductElements/ProductReviewsCount/ProductReviewsCount';
import { ProductStarRating } from '../../ProductElements/ProductStarRating/ProductStarRating';
import { ProductOwnerActions } from './ProductOwnerActions/ProductOwnerActions';

function ProductDetailReturn({ item, isReviewsOpen }) {
  if (item.err) return null;

  const {
    author,
    available,
    avgRating,
    description,
    discount,
    id,
    name,
    clientImage,
    price,
    stock,
    wight,
  } = item;

  const reviewsCount = calcCondition(item, productParams.reviews);

  return (
    <>
      <h3>{name}</h3>
      <div className="row row-cols-1 g-0">
        <div className="card mb-3 position-relative">
          <ProductDiscountBadge discount={discount} />
          <div className="row row-cols-1 g-0 gx-lg-4 product__card product__detail">
            <div className="col-12 col-lg">
              <div className="product__card-img rounded d-block mx-auto my-4 mx-lg-0 ms-lg-4">
                <img src={clientImage} alt="..." />
              </div>
            </div>
            <div className="col-12 col-lg-8 h-100">
              <div className="card-body text-start p-4 ps-lg-0">
                <p className="card-text line-clamp">{description}</p>
                <div className="d-flex justify-content-between">
                  {/* <span>{`likes ${calcCondition(item, 'likes')}`}</span> */}
                  <div className="d-flex gap-2">
                    <ProductStarRating rating={avgRating} />
                    <ProductReviewsCount reviewsCount={reviewsCount} />
                  </div>
                  <ProductOwnerActions item={item} />
                  {/* <span>{`discount ${calcCondition(item, 'discount')}`}</span> */}
                </div>
              </div>
              <footer className="px-4 pb-4 ps-lg-0">
                <ProductAvailableQuantity available={available} stock={stock} />
                <div className="d-flex flex-wrap flex-sm-nowrap">
                  <div
                    className="d-flex w-100 product__card-price_bg align-items-center
                  border border-tertiary rounded m-1 me-2 ms-0 py-2 py-sm-0"
                  >
                    <div className="d-flex flex-wrap my-auto ms-2 fw-semibold product__card-price">
                      <ProductPrice price={price} discount={discount} />
                    </div>
                    <span className="ms-auto me-2">{wight}</span>
                  </div>
                  <WishlistButton id={id} position="down" />
                  <AddToCartButton item={item} textual position="down" />
                </div>
                <div className="pt-3">
                  Продавец:
                  <img
                    src={setImage(author.avatar, defaultImages.type.avatar)}
                    className="vendor__logo rounded-circle d-inline-block ms-2 me-1"
                    alt="..."
                  />
                  <b className="align-middle">{author.name}</b>
                </div>
              </footer>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="row g-0">
            <nav className="nav nav-tabs nav-fill fw-bolder fs-5">
              <NavLink
                to="./description"
                className={clsx(
                  'nav-link',
                  { active: !isReviewsOpen },
                )}
              >
                Описание
              </NavLink>
              <NavLink to="./reviews" className="nav-link">Отзывы</NavLink>
            </nav>
            <hr />
            <Outlet context={description} />
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

  const navigate = useNavigate();

  const isReviewsOpen = useMatch('/products/:productId/reviews');

  const {
    data, isLoading, isFetching, isSuccess, isError, error, refetch,
  } = useQuery({
    queryKey: getProductDetailQueryKey(productId),
    queryFn: () => shopApi.getProductById(productId, authToken),
  });

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
    if (!isLoading && data.err) {
      navigate('/products');
    }
  }, [authToken, data]);

  // const item = data.length && formatGoods(data);

  const item = isSuccess && formatGoods(data);

  return (
    <ProductDetailReturnWithQuery
      item={item}
      isReviewsOpen={isReviewsOpen}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
