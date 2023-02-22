import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCheckoutSelector } from '../../redux/slices/checkoutSlice';
import {
  addToWishlist,
  getWishlistSelector,
  removeFromWishlist,
} from '../../redux/slices/wishlistSlice';
import { calcCondition } from '../../utils/utils';
import {
  Price,
  ProductAvailableQuantity,
} from './ProductDynamicElements/ProductDynamicElements';

export function ProductItem({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector(getCheckoutSelector);
  const wishlist = useSelector(getWishlistSelector);

  const {
    name,
    price,
    pictures,
    discount,
    stock,
    available,
    id,
  } = item;

  const isAddedToCart = checkout.findIndex((el) => el.id === id) !== -1;

  const isWishlisted = wishlist.findIndex((el) => el.id === id) !== -1;

  const WishlistHandler = () => {
    if (!isWishlisted) {
      return dispatch(addToWishlist(id));
    }
    return dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = () => {
    if (!isAddedToCart) {
      return dispatch(addToCart(item));
    }
    return navigate('/checkout');
  };

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
                  <Price price={price} discount={discount} />
                </p>
              </div>
            </div>
            <div className="p-1">
              <button
                onClick={WishlistHandler}
                type="button"
                className={clsx(
                  'btn',
                  'border-2',
                  'btn-wishlist',
                  { added: isWishlisted },
                )}
              >
                <i className="fa-regular fa-heart fa-lg" />
              </button>
            </div>
            <div className="p-1 pe-0">
              <button
                onClick={addToCartHandler}
                type="button"
                className={clsx(
                  'btn',
                  'border-2',
                  'btn-product-cart-add',
                  { added: isAddedToCart },
                )}
                disabled={!available}
              >
                <i className={clsx(
                  'fa-solid',
                  { 'fa-shopping-cart': !isAddedToCart, cart__icon: !isAddedToCart },
                  { 'fa-check': isAddedToCart },
                  'fa-lg',
                )}
                />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
