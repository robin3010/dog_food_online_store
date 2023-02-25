import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  changeAllIsCheckedState,
} from '../../../../redux/slices/checkoutSlice';
import checkoutStyles from '../Checkout.module.css';
import {
  getIsAllChecked,
  getIsCheckedIds,
} from '../../../../utils/checkout&wishlistUtils/checkout&wishlistUtils';
import { RemoveItemsModal } from '../../../Modals/RemoveItemsModal/RemoveItemsModal';
import { REMOVE_TYPE_DATASET } from '../../../Modals/modalsUtils';

export function CheckoutHandlingBar({ checkoutList }) {
  const dispatch = useDispatch();

  const isAllChecked = getIsAllChecked(checkoutList);
  const isCheckedIds = getIsCheckedIds(checkoutList);

  const checkDeleteButtonsStyleClasses = 'border-0 bg-transparent p-0';

  const changeAllSelectHandler = () => {
    dispatch(changeAllIsCheckedState(!isAllChecked));
  };

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [removeType, setRemoveType] = useState('');

  const openRemoveModalHandler = (e) => {
    setIsRemoveModalOpen(true);
    setRemoveType(e.currentTarget.dataset.remove);
  };

  return (
    <>
      <div className="row row-cols-1 gy-3">
        <div className="col">
          <div className="card flex-row flex-wrap align-items-baseline p-3 ps-2 mb-2">
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
                onClick={openRemoveModalHandler}
                data-remove={REMOVE_TYPE_DATASET.selected}
                type="button"
              >
                Удалить выбранные
              </button>
              <button
                className={`ms-auto ${checkDeleteButtonsStyleClasses} ${checkoutStyles.remove}`}
                onClick={openRemoveModalHandler}
                data-remove={REMOVE_TYPE_DATASET.clear}
                type="button"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        </div>
      </div>
      <RemoveItemsModal
        isOpen={isRemoveModalOpen}
        setIsOpen={setIsRemoveModalOpen}
        ids={removeType === REMOVE_TYPE_DATASET.selected ? isCheckedIds : ''}
        type={removeType}
      />
    </>
  );
}
