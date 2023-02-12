import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getTagsSelectedSelector, setTagsFilter } from '../../../redux/slices/filtersSlice';

export function TagFilterButton({ tag }) {
  const dispatch = useDispatch();
  const tagsSelected = useSelector(getTagsSelectedSelector);

  const setTagFilterHandler = (tagName) => {
    dispatch(setTagsFilter(tagName));
  };

  return (
    <button
      onClick={() => setTagFilterHandler(tag)}
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
  );
}
