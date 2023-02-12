import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  changeAllIsCheckedState,
  clearCart,
  removeSelectedItemsFromCart,
} from '../../../../redux/slices/checkoutSlice';
import loginStyles from '../../Login/Login.module.css';
import checkoutStyles from '../Checkout.module.css';
import { getIsAllChecked, getIsCheckedIds } from '../checkoutUtils/checkoutUtils';

export function CheckoutCheckBar({ checkoutList }) {
  const dispatch = useDispatch();

  const isAllChecked = getIsAllChecked(checkoutList);
  const isCheckedIds = getIsCheckedIds(checkoutList);

  const checkDeleteButtonsStyleClasses = 'border-0 bg-transparent p-0';

  const changeAllSelectHandler = () => {
    dispatch(changeAllIsCheckedState(!isAllChecked));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const removeSelectedHandler = (ids) => {
    dispatch(removeSelectedItemsFromCart(ids));
  };

  return (

    <div className="row row-cols-1 gy-3">
      <div className="col">
        <div className="card flex-row flex-wrap align-items-baseline p-3 ps-2 mb-2">
          <div className="form-check me-3">
            <label className="form-check-label user-select-none" htmlFor="checkAll">
              <input
                type="checkbox"
                onChange={changeAllSelectHandler}
                className={clsx(
                  'form-check-input',
                  loginStyles['form-login-check-input'],
                )}
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
              onClick={() => removeSelectedHandler(isCheckedIds)}
              type="button"
            >
              Удалить выбранные
            </button>
            <button
              className={`ms-auto ${checkDeleteButtonsStyleClasses} ${checkoutStyles.remove}`}
              onClick={clearCartHandler}
              type="button"
            >
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
