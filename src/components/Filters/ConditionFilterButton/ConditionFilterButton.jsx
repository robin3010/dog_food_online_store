import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getLastSortSelector, sortGoodsList } from '../../../redux/slices/goodsSlice';
import { productParams } from '../../../utils/constants';

export function ConditionFilterButton({ conditionKey, conditionValue }) {
  const lastSort = useSelector(getLastSortSelector);
  const dispatch = useDispatch();

  const priceOrderIcon = (lastFilter, currFilter) => {
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
    if (lastSort === productParams.price) {
      e.currentTarget.lastChild.classList.toggle('fa-flip-vertical');
    }
  };

  return (
    <button
      onClick={(e) => sortHandler(conditionKey, e)}
      type="button"
      className={clsx(
        'btn',
        'border-0',
        { 'fw-semibold': lastSort === conditionKey },
      )}
    >
      {conditionValue}
      {priceOrderIcon(lastSort, conditionKey)}
    </button>
  );
}
