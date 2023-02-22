import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { shopApi } from '../../../api/shopApi';
import { setSearchFilter } from '../../../redux/slices/filtersSlice';
import { searchParamsKeys } from '../../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [search, setSearch] = useState(
  //   () => searchParams.get(searchParamsKeys.q) ?? '',
  // );
  const searchQuery = searchParams.get(searchParamsKeys.q) ?? '';

  const debouncedSearch = useDebounce(searchQuery, 750);

  const dispatch = useDispatch();

  const setSearchHandler = (e) => {
    const newSearchValue = e.target.value;
    // setSearch(newSearchValue);
    if (newSearchValue === '') {
      searchParams.delete(searchParamsKeys.q);
      return setSearchParams(searchParams);
    }
    return setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [searchParamsKeys.q]: newSearchValue,
    });
  };

  useEffect(() => {
    dispatch(setSearchFilter(debouncedSearch));
    shopApi.setSearch(debouncedSearch);
  }, [debouncedSearch, dispatch]);

  return (
    <div className="col-12 col-md-6">
      <input
        onChange={setSearchHandler}
        value={searchQuery}
        className="form-control form-control rounded-4"
        type="search"
        placeholder="Поиск"
      />
    </div>
  );
}
