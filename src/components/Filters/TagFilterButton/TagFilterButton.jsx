import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { searchParamsKeys } from '../../../utils/constants';
import { setTagsFilter } from '../filterUtils/filterUtils';

export function TagFilterButton({ tag }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tagsQuery = searchParams.get(searchParamsKeys.tags);
  const tagsSelected = tagsQuery ? tagsQuery.split(',') : [];

  const setTagFilterHandler = () => {
    const newTagFilter = setTagsFilter(tagsSelected, tag);
    if (!newTagFilter.length) {
      searchParams.delete(searchParamsKeys.tags);
      return setSearchParams(searchParams);
    }
    return setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [searchParamsKeys.tags]: newTagFilter.join(),
    });
  };

  return (
    <div className="col">
      <button
        onClick={setTagFilterHandler}
        type="button"
        className={clsx(
          'btn',
          'btn-light',
          'rounded-4',
          'text-capitalize',
          { active: tagsSelected.find((t) => t === tag) },
        )}
      >
        {tag}
      </button>
    </div>
  );
}
