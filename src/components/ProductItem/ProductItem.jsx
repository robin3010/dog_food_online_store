import { Link } from 'react-router-dom';
import { calcCondition } from '../../utils/utils';
import { AddToCartButton } from '../Buttons/AddToCartButton/AddToCartButton';
import { WishlistButton } from '../Buttons/WishlistButton/WishlistButton';
import {
  ProductAvailableQuantity,
} from '../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductPrice } from '../ProductElements/ProductPrice/ProductPrice';

export function ProductItem({ item }) {
  const {
    name,
    price,
    pictures,
    discount,
    stock,
    available,
    id,
  } = item;

  return (
    <div className="col">
      <div className="card h-100" style={{ minWidth: '18rem' }}>
        <div>
          <span>{`likes ${calcCondition(item, 'likes')}`}</span>
          <br />
          <span>{`reviews ${calcCondition(item, 'reviews')}`}</span>
          <br />
          <span>{`rating ${calcCondition(item, 'rating')}`}</span>
          <br />
          <span>{`discount ${calcCondition(item, 'discount')}`}</span>
        </div>
        <div className="product__card-img pt-3">
          <img src={pictures} alt="..." />
        </div>
        <div className="card-body text-start">
          <p className="card-text">{name}</p>
        </div>
        <footer className="px-3 pb-3">
          <ProductAvailableQuantity available={available} stock={stock} />
          <div className="d-flex product__card">
            <div className="d-flex w-100 me-auto p-1 ps-0">
              <div
                className="d-flex product__card-price_bg
                border border-tertiary rounded w-100"
              >
                <p className="m-auto ms-2 fw-semibold product__card-price">
                  <ProductPrice price={price} discount={discount} />
                </p>
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
