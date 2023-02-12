import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeIsCheckedState,
  itemCountChange, itemCountDecrement, itemCountIncrement, removeItemFromCart,
} from '../../../../redux/slices/checkoutSlice';
import { productParams } from '../../../../utils/constants';
import {
  calcCondition,
  formatPrice,
} from '../../../../utils/utils';
import { Price } from '../../../ProductItem/ProductDynamicElements/ProductDynamicElements';
import styles from '../Checkout.module.css';
import loginStyles from '../../Login/Login.module.css';

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

  const countChangeHandler = (e, itemId) => {
    const newCountValue = +e.target.value || input;
    const payload = {
      id: itemId,
      count: newCountValue,
    };
    // console.log({ payload });
    setInput(newCountValue);

    dispatch(itemCountChange(payload));
  };

  const countIncrementHandler = (itemId) => {
    dispatch(itemCountIncrement(itemId));
  };

  const countDecrementHandler = (itemId) => {
    dispatch(itemCountDecrement(itemId));
  };

  const removeItemHandler = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const selectItemHandler = (itemId) => {
    dispatch(changeIsCheckedState(itemId));
  };

  return (
    <div className="col-12">
      <div className="card p-3 position-relative">
        <div
          className="position-absolute ps-2 pt-2 top-0 start-0"
          // style={{ top: '-0.5rem', left: '-0.5rem' }}
        >
          <input
            type="checkbox"
            onChange={() => selectItemHandler(id)}
            className={clsx(
              'form-check-input',
              'm-0',
              loginStyles['form-login-check-input'],
            )}
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
                onClick={(e) => e.currentTarget.classList.toggle([styles.active])}
                className={`border-0 bg-transparent p-0 ${styles.wishlist}`}
                type="button"
              >
                <small>В избранное</small>
              </button>
              <button
                onClick={() => removeItemHandler(id)}
                className={`border-0 bg-transparent p-0 ${styles.removeSm}`}
                type="button"
              >
                <small>Удалить</small>
              </button>
            </div>
          </div>
          <div className="col">
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: '6rem' }}
            >
              <div
                className="input-group input-group-sm"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => countDecrementHandler(id)}
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
                  onChange={(e) => countChangeHandler(e, id)}
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
                  onClick={() => countIncrementHandler(id)}
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
