// import { useDispatch } from 'react-redux';
// import { removeFromWishlist } from '../../../../redux/slices/wishlistSlice';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  getCheckoutSelector,
} from '../../../../redux/slices/checkoutSlice';
import {
  addToWishlist,
  changeIsCheckedState,
  getWishlistSelector,
  removeFromWishlist,
} from '../../../../redux/slices/wishlistSlice';
import { calcCondition } from '../../../../utils/utils';
import {
  Price,
  ProductAvailableQuantity,
  WishlistButtonTooltip,
} from '../../../ProductItem/ProductDynamicElements/ProductDynamicElements';
import '../../../../css/buttons.css';

export function WishlistProductItem({ item }) {
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
    isChecked,
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

  const selectItemHandler = () => {
    dispatch(changeIsCheckedState(id));
  };

  return (
    <div className="col-12">
      <div className="card p-3 position-relative">
        <div
          className="position-absolute ps-2 pt-2 top-0 start-0"
        >
          <input
            type="checkbox"
            onChange={selectItemHandler}
            className="form-check-input m-0"
            checked={isChecked}
          />
        </div>
        <div className="row g-3">
          <div className="col-auto">
            <div
              className="product__card-img checkout__product_card-img"
            >
              <img src={pictures} alt="..." />
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column justify-content-between h-100">
              <p className="card-text">{name}</p>
              <div className="d-flex gap-3">
                <ProductAvailableQuantity available={available} stock={stock} />
                <span>{`rating ${calcCondition(item, 'rating')}`}</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="d-flex flex-column align-items-end fw-semibold">
                <Price price={price} discount={discount} column />
              </div>
              <div className="d-flex justify-content-end gap-3 product__card">
                <button
                  onClick={WishlistHandler}
                  type="button"
                  className={clsx(
                    'btn',
                    'border-2',
                    'btn-wishlist',
                    'btn-tooltip tooltip-up',
                    { added: isWishlisted },
                  )}
                >
                  <WishlistButtonTooltip isWishlisted={isWishlisted} />
                  <i className="fa-regular fa-heart fa-lg" />
                </button>
                <button
                  onClick={addToCartHandler}
                  type="button"
                  className={clsx(
                    'btn',
                    'border-2',
                    'btn-product-cart-add',
                    { added: isAddedToCart },
                  )}
                  style={{ minWidth: '6.5rem' }}
                  disabled={!available}
                >
                  {!isAddedToCart ? 'Купить' : 'В корзине'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
