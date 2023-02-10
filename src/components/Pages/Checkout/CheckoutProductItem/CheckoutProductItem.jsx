import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCheckoutSelector, itemCountChange, itemCountDecrement, itemCountIncrement, removeItemFromCart,
} from '../../../../redux/slices/checkoutSlice';
import { productParams } from '../../../../utils/constants';
import {
  calcCondition,
  formattedPrice,
  getCheckoutItemParams,
} from '../../../../utils/utils';
import { Price } from '../../../ProductItem/ProductDynamicElements/ProductDynamicElements';
import styles from '../Checkout.module.css';

export function CheckoutProductItem({ item }) {
  const checkout = useSelector(getCheckoutSelector);

  const {
    name,
    price,
    pictures,
    discount,
    stock: quantity,
    // available,
    id,
  } = item;

  const { count, isChecked } = getCheckoutItemParams(item, checkout);
  console.log({ count, isChecked });

  const [input, setInput] = useState(count);
  const dispatch = useDispatch();

  const countChangeHandler = (e, itemId) => {
    const newCountValue = +e.target.value || input;
    const payload = {
      id: itemId,
      count: newCountValue,
    };
    console.log({ payload });
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

  return (
    <div className="col-12">
      <div className="card p-3">
        <div className="row g-3">
          <div className="col">
            <div
              className="product__card-picture"
              style={{ width: '96px', height: '96px' }}
            >
              <img src={pictures} alt="..." />
            </div>
          </div>
          <div className="col-6">
            <p className="card-text">{name}</p>
            <div className="d-flex gap-3">
              <button
                onClick={(e) => e.target.classList.toggle([styles.active])}
                className={`border-0 bg-transparent p-0 ${styles.wishlist}`}
                type="button"
              >
                <small>В избранное</small>
              </button>
              <button
                onClick={() => removeItemHandler(id)}
                className={`border-0 bg-transparent p-0 ${styles.remove}`}
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
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Tooltip on bottom"
              >
                <button
                  type="button"
                  onClick={() => countDecrementHandler(id)}
                  className={clsx(
                    'btn',
                    'border-end-0',
                    [styles['btn-quantity-counter']],
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
                    [styles['quantity-counter']],
                  )}
                  max={quantity}
                  maxLength={quantity.toString().length}
                  value={count}
                />
                <button
                  type="button"
                  onClick={() => countIncrementHandler(id)}
                  className={clsx(
                    'btn',
                    'border-start-0',
                    [styles['btn-quantity-counter']],
                    { disabled: count === quantity },
                  )}
                >
                  <i className="fa-solid fa-plus" />
                </button>
              </div>
              <small className={clsx('text-muted', { 'd-none': count === 1 })}>
                {`${formattedPrice(
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
