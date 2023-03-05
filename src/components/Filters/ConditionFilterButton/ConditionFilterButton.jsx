import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { productParams, searchParamsKeys } from '../../../utils/constants';

export function ConditionFilterButton({ conditionKey, conditionValue }) {
  const [searchParams, setSearchParams] = useSearchParams();

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
    return null;
  };

  const sortHandler = () => {
    let sortFilterName = conditionKey;
    if (conditionKey === productParams.price) {
      if (lastSort === productParams.price_up) sortFilterName = productParams.price_down;
      if (lastSort !== productParams.price_up) sortFilterName = productParams.price_up;
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [searchParamsKeys.sort]: sortFilterName,
    });
  };

  return (
    <button
      onClick={sortHandler}
      type="button"
      className={clsx(
        'btn p-0',
        'border-0',
        { 'fw-semibold': lastSort === conditionKey },
      )}
    >
      {conditionValue}
      {sortByPriceIcon(lastSort, conditionKey)}
    </button>
  );
}
