import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { setSearchFilter } from '../../../redux/slices/filtersSlice';
import { searchParamsKeys } from '../../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    () => searchParams.get(searchParamsKeys.q) ?? '',
  );

  const debouncedSearch = useDebounce(search, 750);

  const dispatch = useDispatch();

  const setSearchHandler = (e) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [searchParamsKeys.q]: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(setSearchFilter(debouncedSearch));
    shopApi.setSearch(debouncedSearch);
  }, [debouncedSearch, dispatch]);

  return (
    <input
      onChange={setSearchHandler}
      value={search}
      className="form-control form-control-sm rounded-4 w-50"
      type="text"
      placeholder="Поиск"
    />
  );
}
