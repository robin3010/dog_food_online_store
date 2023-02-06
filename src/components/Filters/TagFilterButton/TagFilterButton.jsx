import { useDispatch } from 'react-redux';
import { setTagsFilter } from '../../../redux/slices/filtersSlice';

export function TagFilterButton({ tag }) {
  const dispatch = useDispatch();

  const setTagFilterHandler = (tagName, e) => {
    dispatch(setTagsFilter(tagName));
    e.target.classList.toggle('active');
  };

  return (
    <button
      onClick={(e) => setTagFilterHandler(tag, e)}
      type="button"
      className="btn btn-light rounded-4"
    >
      {tag[0].toUpperCase() + tag.slice(1)}
    </button>
  );
}
