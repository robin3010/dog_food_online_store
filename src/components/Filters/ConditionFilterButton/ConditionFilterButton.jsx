import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { sortGoodsList } from '../../../redux/slices/goodsSlice';
import { productParams, searchParamsKeys } from '../../../utils/constants';

export function ConditionFilterButton({ conditionKey, conditionValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const lastSort = searchParams.get(searchParamsKeys.sort) ?? '';

  const sortByPriceIcon = (lastFilter, currFilter) => {
    if (currFilter === productParams.price) {
      return (
        <i className={clsx(
          'ms-1',
          'fa-solid',
          'fa-arrow-down-wide-short',
          { 'fa-flip-vertical': lastFilter === productParams.price_up },
          { 'd-none': !lastFilter.startsWith(productParams.price) },
        )}
        />
      );
    }
    return undefined;
  };

  const sortHandler = (condition, lastSortValue) => {
    let sortFilterName = condition;
    if (condition === productParams.price) {
      if (lastSortValue === productParams.price_up) sortFilterName = productParams.price_down;
      if (lastSortValue !== productParams.price_up) sortFilterName = productParams.price_up;
    }

    dispatch(sortGoodsList({ condition, sortFilterName }));

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [searchParamsKeys.sort]: sortFilterName,
    });
  };

  return (
    <button
      onClick={() => sortHandler(conditionKey, lastSort)}
      type="button"
      className={clsx(
        'btn',
        'border-0',
        { 'fw-semibold': lastSort === conditionKey },
      )}
    >
      {conditionValue}
      {sortByPriceIcon(lastSort, conditionKey)}
    </button>
  );
}
