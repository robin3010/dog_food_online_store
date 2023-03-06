import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  changeIsCheckedState, itemCountChange, itemCountDecrement, itemCountIncrement,
} from '../../../../redux/slices/checkoutSlice';
import {
  addToWishlist, getWishlistSelector, removeFromWishlist,
} from '../../../../redux/slices/wishlistSlice';
import { productParams } from '../../../../utils/constants';
import {
  calcCondition, formatPrice,
} from '../../../../utils/utils';
import { NonExistentProductCard } from '../../../Buttons/NonExistentProductCard/NonExistentProductCard';
import { RemoveItemsModal } from '../../../Modals/RemoveItemsModal/RemoveItemsModal';
import { ProductPrice } from '../../../ProductElements/ProductPrice/ProductPrice';
import { ItemCountLimitTooltip } from '../../../ProductElements/ProductTooltips/ProductTooltips';
import styles from '../Checkout.module.css';

export function CheckoutProductItem({ item }) {
  const {
    name,
    price,
    clientImage,
    discount,
    stock,
    id,
    count,
    isChecked,
    err,
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
    setInput(newCountValue);

    dispatch(itemCountChange(payload));
  };

  const countIncrementHandler = () => {
    dispatch(itemCountIncrement(id));
  };

  const countDecrementHandler = () => {
    dispatch(itemCountDecrement(id));
  };

  const selectItemHandler = () => {
    dispatch(changeIsCheckedState(id));
  };

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const openRemoveModalHandler = () => {
    setIsRemoveModalOpen(true);
  };

  if (err) {
    return <NonExistentProductCard id={id} listType="checkout" />;
  }

  return (
    <>
      <div className="col-12 checkout__product_card">
        <div className="card p-3 position-relative">
          <div
            className="position-absolute ps-2 pt-2 top-0 start-0 z-1"
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
              <Link to={`/products/${id}`} className="position-relative">
                <div className="overlayable_content d-flex flex-column">
                  <div className="product__card-img checkout__product_card-img">
                    <img src={clientImage} alt="..." />
                  </div>
                  <div className="overlay-action">
                    <i className="fa-regular fa-eye fa-2x" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6">
              <Link to={`/products/${id}`}>
                <p>{name}</p>
              </Link>
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
                  onClick={openRemoveModalHandler}
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
                <ProductPrice price={price * count} discount={discount} column />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RemoveItemsModal
        isOpen={isRemoveModalOpen}
        setIsOpen={setIsRemoveModalOpen}
        name={name}
        ids={id}
      />
    </>
  );
}
