import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getGoodsSelector, sortGoodsList } from '../../../redux/slices/goodsSlice';

export function ConditionFilterButton({ conditionKey, conditionValue }) {
  const { lastSort } = useSelector(getGoodsSelector);
  const dispatch = useDispatch();

  const priceOrderIconHandler = (lastFilter, currFilter) => {
    if (lastFilter === 'price') {
      return (
        <i className={clsx(
          'fa-solid',
          'fa-arrow-down-wide-short',
          'ms-1',
          { 'd-none': lastFilter !== currFilter },
        )}
        />
      );
    }
    return undefined;
  };

  const sortHandler = (condition, e) => {
    dispatch(sortGoodsList(condition));
    if (lastSort === 'price') {
      e.target.lastChild.classList.toggle('fa-flip-vertical');
    }
  };

  return (
    <button
      onClick={(e) => sortHandler(conditionKey, e)}
      type="button"
      className={clsx(
        'btn',
        { 'fw-semibold': lastSort === conditionKey },
      )}
      style={{ border: 'none' }}
    >
      {conditionValue}
      {/* <i className={clsx(
        'fa-solid',
        'fa-arrow-down-wide-short',
        'ms-1',
        { 'd-none': lastSort !== conditionKey },
      )}
      /> */}
      {priceOrderIconHandler(lastSort, conditionKey)}
    </button>
  );
}
