import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  changeAllIsCheckedState,
} from '../../../../redux/slices/checkoutSlice';
import {
  getIsCheckedIds,
  getSelectedItemsCount,
  getTotal,
} from '../../../../utils/checkout&wishlistUtils/checkout&wishlistUtils';
import styles from '../Checkout.module.css';
import { formatPrice, getGoodsSuffix } from '../../../../utils/utils';
import '../../../../css/buttons.css';

export function CheckoutSummary({ checkoutList }) {
  const dispatch = useDispatch();

  const isCheckedIds = getIsCheckedIds(checkoutList);
  const selectedItemsCount = getSelectedItemsCount(checkoutList);
  const { totalPrice, totalDiscount, totalPriceDiscounted } = getTotal(checkoutList, true);

  const selectAllItemsHandler = () => {
    dispatch(changeAllIsCheckedState(true));
  };

  const chekoutProceedHandler = () => {
    const order = checkoutList.filter((item) => item.isChecked)
      .map(({ id, name, count }) => ({ id, name, count }));
    console.log({ 'Оформляем товары': order });
  };

  if (!isCheckedIds.length) {
    return (
      <div className={`col-12 col-lg-3 px-0 ${styles.summary__position}`}>
        <div className="card">
          <div className="
          card-body
          d-flex
          flex-column
          flex-sm-row
          flex-lg-column
          justify-content-between
          py-3"
          >
            <div className="
            card-text
            text-center
            align-self-center
            align-self-sm-end
            align-self-lg-center
            mb-2"
            >
              Выберите товары, чтобы перейти к оформлению
            </div>
            <label className="btn btn-secondary" htmlFor="checkAll">
              <input
                type="checkbox"
                onChange={selectAllItemsHandler}
                className="btn-check"
                name="checkAll"
                id="checkAll"
              />
              Выбрать все
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`col-12 col-lg-3 px-0 ${styles.summary__position}`}>
      <div className="card">
        <div className="card-title d-none d-lg-block text-center pt-4">
          <h5>Условия заказа</h5>
          <hr />
        </div>
        <div className="
          card-body
          d-flex
          flex-column
          flex-sm-row
          flex-lg-column
          justify-content-between
          py-3"
        >
          <div className="d-flex gap-3 gap-lg-0 justify-content-between align-items-end">
            <div className="card-text">
              <small>Итого:</small>
              <h5>
                {selectedItemsCount}
                {getGoodsSuffix(selectedItemsCount)}
              </h5>
            </div>
            <div className="card-text text-end">
              <small className={clsx(
                'strike-through',
                { 'd-none': totalPrice === totalPriceDiscounted },
              )}
              >
                {formatPrice(totalPrice)}
              </small>
              <h5>{formatPrice(totalPriceDiscounted)}</h5>
            </div>
          </div>
          <div className="d-none d-lg-flex justify-content-between align-items-end">
            <div className="card-text">
              <p>
                {selectedItemsCount}
                {getGoodsSuffix(selectedItemsCount)}
              </p>
              <p className="discount">Общая скидка</p>
            </div>
            <div className="card-text text-end">
              <p>{formatPrice(totalPriceDiscounted)}</p>
              <p className="discount">{formatPrice(totalDiscount)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={chekoutProceedHandler}
            className="btn mt-0 p-1 p-sm-3 btn-primary"
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </div>
  );
}
