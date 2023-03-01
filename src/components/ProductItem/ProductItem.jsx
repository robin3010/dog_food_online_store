import { Link } from 'react-router-dom';
import { productParams } from '../../utils/constants';
import { calcCondition } from '../../utils/utils';
import { AddToCartButton } from '../Buttons/AddToCartButton/AddToCartButton';
import { WishlistButton } from '../Buttons/WishlistButton/WishlistButton';
import { ProductDiscountBadge } from '../ProductElements/ProductDiscountBadge/ProductDiscountBadge';
import { ProductPrice } from '../ProductElements/ProductPrice/ProductPrice';
import { ProductReviewsCount } from '../ProductElements/ProductReviewsCount/ProductReviewsCount';
import { ProductStarRating } from '../ProductElements/ProductStarRating/ProductStarRating';

export function ProductItem({ item }) {
  const {
    available,
    avgRating,
    discount,
    id,
    name,
    pictures,
    price,
    stock,
  } = item;

  const reviewsCount = calcCondition(item, productParams.reviews);

  return (
    <div className="col product__card">
      <div className="card h-100 position-relative" style={{ minWidth: '18rem' }}>
        <ProductDiscountBadge discount={discount} />
        <Link to={`./${id}`} className="position-relative h-100">
          <div className="overlayable_content d-flex flex-column">
            <div>
              <p className="text-end">{`likes ${calcCondition(item, 'likes')}`}</p>
            </div>
            <div className="product__card-img pt-3">
              <img src={pictures} alt="..." />
            </div>
            <div className="card-body text-start">
              <p className="card-text">{name}</p>
            </div>
            <div className="product__card-overlay">
              <i className="fa-regular fa-eye fa-2x" />
            </div>
          </div>
        </Link>
        <footer className="px-3 pb-3">
          <div className="d-flex gap-2">
            <ProductStarRating rating={avgRating} />
            <ProductReviewsCount reviewsCount={reviewsCount} />
          </div>
          <ProductAvailableQuantity available={available} stock={stock} />
          <div className="d-flex">
            <div
              className="d-flex w-100 product__card-price_bg
                  border border-tertiary rounded m-1 me-2 ms-0"
            >
              <div className="d-flex flex-wrap my-auto ms-2 fw-semibold product__card-price">
                <ProductPrice price={price} discount={discount} />
              </div>
            </div>
            <WishlistButton id={id} />
            <AddToCartButton item={item} textual={false} />
          </div>
        </footer>
      </div>
    </div>
  );
}
