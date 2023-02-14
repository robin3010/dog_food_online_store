import clsx from 'clsx';
import { Link } from 'react-router-dom';
import loginStyles from '../Pages/Login/Login.module.css';

export function PlaceholderButtons({ filters, list }) {
  const listValue = Array.isArray(list) ? list.length : list;

  return (
    <div className={clsx(
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
        className={clsx(
          'col',
          { 'col-12 col-md-10 col-md-8 col-lg-6 col-xl-4 mx-auto': !listValue && !filters },
        )}
      >
        <button
          type="button"
          className="btn btn-secondary mb-2 h-100 w-100"
        >
          На главную
        </button>
      </Link>
      <Link to="/products" className={clsx('col', { 'd-none': !listValue && !filters })}>
        <button
          type="button"
          className={`btn mb-2 h-100 w-100 px-1 ${loginStyles['btn-login-primary']}`}
        >
          { filters ? 'Очистить фильтры' : 'В каталог'}
        </button>
      </Link>
    </div>
  );
}
