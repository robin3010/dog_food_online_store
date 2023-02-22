import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/buttons.css';

export function PlaceholderButtons({ filters, list }) {
  const listValue = Array.isArray(list) ? list.length : list;

  // const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const clearSearchHandler = () => {
    // setSearch('');
    // searchParams.delete('q');
    // setSearchParams(searchParams);
    navigate('/products');
  };

  return (
    <div
      className={clsx(
        'row',
        'row-cols-1',
        { 'row-cols-sm-2': listValue || filters },
        'w-75',
        'gy-2',
        'gy-sm-0',
      )}
    >
      <Link
        to="/"
        className={clsx('col', {
          'col-12 col-md-10 col-md-8 col-lg-6 col-xl-4 mx-auto':
            !listValue && !filters,
        })}
      >
        <button
          type="button"
          className="btn btn-alt-outline-secondary mb-2 h-100 w-100"
        >
          На главную
        </button>
      </Link>
      <div
        // to="/products"
        // onClick={clearSearchHandler}
        className={clsx('col', { 'd-none': !listValue && !filters })}
      >
        <button
          onClick={clearSearchHandler}
          type="button"
          className="btn mb-2 h-100 w-100 px-1 btn-primary"
        >
          {filters ? 'Очистить фильтры' : 'В каталог'}
        </button>
      </div>
    </div>
  );
}
