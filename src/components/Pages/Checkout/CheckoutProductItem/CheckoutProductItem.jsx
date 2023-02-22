import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeIsCheckedState,
  itemCountChange, itemCountDecrement, itemCountIncrement, removeFromCart,
} from '../../../../redux/slices/checkoutSlice';
import {
  addToWishlist,
  getWishlistSelector,
  removeFromWishlist,
} from '../../../../redux/slices/wishlistSlice';
import { productParams } from '../../../../utils/constants';
import {
  calcCondition,
  formatPrice,
} from '../../../../utils/utils';
import {
  ItemCountLimitTooltip,
  Price,
} from '../../../ProductItem/ProductDynamicElements/ProductDynamicElements';
import styles from '../Checkout.module.css';

export function CheckoutProductItem({ item }) {
  const {
    name,
    price,
    pictures,
    discount,
    stock,
    id,
    count,
    isChecked,
  } = item;

  const [input, setInput] = useState(count);
  const dispatch = useDispatch();

  const wishlist = useSelector(getWishlistSelector);
  const isWishlisted = wishlist.findIndex((el) => el.id === id) !== -1;

  const WishlistHandler = () => {
    if (!isWishlisted) {
      return dispatch(addToWishlist(id));
    }
    return dispatch(removeFromWishlist(id));
  };

  const countChangeHandler = (e) => {
    const newCountValue = +e.target.value || input;
    const payload = {
      id,
      count: newCountValue,
    };
    // console.log({ payload });
    setInput(newCountValue);

    dispatch(itemCountChange(payload));
  };

  const countIncrementHandler = () => {
    dispatch(itemCountIncrement(id));
  };

  const countDecrementHandler = () => {
    dispatch(itemCountDecrement(id));
  };

  const removeItemHandler = () => {
    dispatch(removeFromCart(id));
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
          <div className="col">
            <div
              className="product__card-img checkout__product_card-img"
            >
              <img src={pictures} alt="..." />
            </div>
          </div>
          <div className="col-6">
            <p className="card-text">{name}</p>
            <div className="d-flex gap-3">
              <button
                onClick={WishlistHandler}
                className={clsx(
                  'border-0 bg-transparent p-0',
                  styles.wishlist,
                  { [styles.active]: isWishlisted },
                )}
                type="button"
              >
                <small>{isWishlisted ? 'Убрать из избранного' : 'В избранное'}</small>
              </button>
              <button
                onClick={removeItemHandler}
                className={`border-0 bg-transparent p-0 ${styles.removeSm}`}
                type="button"
              >
                <small>Удалить</small>
              </button>
            </div>
          </div>
          <div className="col">
            <div
              className="d-flex flex-column align-items-center btn-tooltip tooltip-down"
              style={{ width: '6rem' }}
            >
              <ItemCountLimitTooltip stock={stock} count={count} />
              <div
                className="input-group input-group-sm"
                role="group"
              >
                <button
                  type="button"
                  onClick={countDecrementHandler}
                  className={clsx(
                    'btn',
                    'border-end-0',
                    styles['btn-quantity-counter'],
                    { disabled: count === 1 },
                  )}
                >
                  <i className="fa-solid fa-minus" />
                </button>
                <input
                  type="number"
                  onChange={countChangeHandler}
                  className={clsx(
                    'border-start-0',
                    'border-end-0',
                    'form-control',
                    'text-center',
                    styles['quantity-counter'],
                  )}
                  max={stock}
                  maxLength={stock.toString().length}
                  value={count}
                />
                <button
                  type="button"
                  onClick={countIncrementHandler}
                  className={clsx(
                    'btn',
                    'border-start-0',
                    styles['btn-quantity-counter'],
                    { disabled: count === stock },
                  )}
                >
                  <i className="fa-solid fa-plus" />
                </button>
              </div>
              <small className={clsx('text-muted', { 'd-none': count === 1 })}>
                {`${formatPrice(
                  calcCondition(item, productParams.price),
                )} / шт.`}
              </small>
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column align-items-end fw-semibold">
              <Price price={price * count} discount={discount} column />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
