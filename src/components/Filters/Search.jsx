import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shopApi } from '../../api/shopApi';
import { setSearchFilter } from '../../redux/slices/filtersSlice';
import { resetLastSort } from '../../redux/slices/goodsSlice';
import { useDebounce } from '../hooks/useDebounce';

export function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const dispatch = useDispatch();

  const setSearchHandler = (e) => {
    const newSearchValue = e.target.value;

    setSearch(newSearchValue);
  };

  useEffect(() => {
    dispatch(setSearchFilter(debouncedSearch));
    dispatch(resetLastSort());
    shopApi.setSearch(debouncedSearch);
  }, [debouncedSearch, dispatch]);

  return (
    <input
      onChange={setSearchHandler}
      value={search}
      className="form-control form-control-sm rounded-4 w-50"
      type="text"
      placeholder="найти..."
    />
  );
}
