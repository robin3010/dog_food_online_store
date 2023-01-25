import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import { useUserDataContext } from '../../../context/UserDataContext';

const defaultAvatar = 'https://react-learning.ru/image-compressed/default-image.jpg';

function LoggedIn() {
  const { userData, logout } = useUserDataContext();
  let userName = '';
  let firstName;
  let avatar;
  if (Object.keys(userData).length === 0) {
    firstName = 'Покупатель';
    avatar = defaultAvatar;
  }
  if (Object.keys(userData).length > 0) {
    ({ userName, avatar } = userData);
    firstName = userName.replace(/\s.*/, '');
  }

  return (
    <div className="btn-group">
      <button
        className="nav-link dropdown-toggle bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <i className={clsx(
          'fa-solid',
          'fa-user',
          'fa-xl',
          { 'd-none': avatar !== defaultAvatar },
        )}
        />
        <img
          src={avatar ?? defaultAvatar}
          alt=""
          className={clsx(
            'rounded-5',
            'bg-tertiary',
            'bg-opacity-10',
            'opacity-75',
            'header__user-avatar',
            { 'd-none': avatar === defaultAvatar },
          )}
        />
      </button>
      <ul className="dropdown-menu dropdown-menu-sm-end text-center">
        <li>
          <span className="dropdown-item-text fw-semibold">
            {firstName}
          </span>
        </li>
        <hr className="my-2" />
        <li>
          <Link
            to="/login"
            onClick={logout}
            className="btn nav-link dropdown-item"
          >
            <i className="fa-solid fa-right-from-bracket fa-xl me-2" />
            <span>Выйти</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function LoggedOut() {
  return (
    <NavLink to="/login" className="nav-link">
      <i className="fa-solid fa-user fa-xl" />
    </NavLink>
  );
}

export function LoginButton() {
  const { authToken } = useUserDataContext();

  if (!authToken) return <LoggedOut />;

  return <LoggedIn />;
}
