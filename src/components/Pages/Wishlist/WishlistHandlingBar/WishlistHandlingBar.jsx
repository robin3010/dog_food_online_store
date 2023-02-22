import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  changeAllIsCheckedState,
  clearWishlist,
  removeSelectedFromWishlist,
} from '../../../../redux/slices/wishlistSlice';
import checkoutStyles from '../../Checkout/Checkout.module.css';
import {
  getIsAllChecked,
  getIsCheckedIds,
  getTotal,
} from '../../../../utils/checkout&wishlistUtils/checkout&wishlistUtils';
import { formatPrice, getGoodsSuffix } from '../../../../utils/utils';

export function WishlistHandlingBar({ wishlistFetched }) {
  const dispatch = useDispatch();

  const isAllChecked = getIsAllChecked(wishlistFetched);
  const isCheckedIds = getIsCheckedIds(wishlistFetched);

  const wishlistCount = wishlistFetched.length;
  const { totalPriceDiscounted } = getTotal(wishlistFetched);

  const checkDeleteButtonsStyleClasses = 'border-0 bg-transparent p-0';

  const changeAllSelectHandler = () => {
    dispatch(changeAllIsCheckedState(!isAllChecked));
  };

  const clearWishlistHandler = () => {
    dispatch(clearWishlist());
  };

  const removeSelectedHandler = () => {
    dispatch(removeSelectedFromWishlist(isCheckedIds));
  };

  // const addAllToCart = () => {
  //   dispatch();
  // }

  return (
    <div className="card p-3 ps-2 mb-2">
      <div className="row row-cols-1 gy-3">
        <div className="col">
          <div className="d-flex gap-2 align-items-baseline ps-2">
            <h5>
              {wishlistCount}
              {getGoodsSuffix(wishlistCount)}
              {' на сумму'}
              <span style={{ marginLeft: '0.1rem' }}>:</span>
            </h5>
            <h5>
              {formatPrice(totalPriceDiscounted)}
            </h5>
          </div>
        </div>
        <div className="col">
          <div className="d-flex flex-wrap align-items-baseline">
            <div className="form-check me-3">
              <label className="form-check-label user-select-none" htmlFor="checkAll">
                <input
                  type="checkbox"
                  onChange={changeAllSelectHandler}
                  className="form-check-input"
                  name="checkAll"
                  id="checkAll"
                  checked={isAllChecked}
                />
                Выбрать все
              </label>
            </div>
            <div className="d-flex flex-grow-1">
              <button
                className={clsx(
                  checkDeleteButtonsStyleClasses,
                  checkoutStyles.remove,
                  { [checkoutStyles.disabled]: !isCheckedIds.length },
                )}
                onClick={removeSelectedHandler}
                type="button"
              >
                Удалить выбранные
              </button>
              <button
                className={`ms-auto ${checkDeleteButtonsStyleClasses} ${checkoutStyles.remove}`}
                onClick={clearWishlistHandler}
                type="button"
              >
                Очистить список
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
