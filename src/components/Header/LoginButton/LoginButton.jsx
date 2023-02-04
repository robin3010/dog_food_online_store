import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getUserDataSelector, logout } from '../../../redux/slices/userSlice';

const defaultAvatar = 'https://react-learning.ru/image-compressed/default-image.jpg';
const defaultFirstName = 'Покупатель';

function LoggedIn() {
  const userData = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

  let firstName = defaultFirstName;
  let avatar = defaultAvatar;

  if (Object.keys(userData).length) {
    const userName = userData.name;
    firstName = userName.replace(/\s.*/, '') || defaultFirstName;
    avatar = userData.avatar || defaultAvatar;
  }

  return (
    <div className="btn-group">
      <button
        className="nav-link dropdown-toggle bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className={clsx(
          'fa-solid',
          'fa-user',
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
            onClick={() => dispatch(logout())}
            className="btn nav-link dropdown-item"
          >
            <i className="fa-solid fa-right-from-bracket me-2" />
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
      <i className="fa-solid fa-user" />
    </NavLink>
  );
}

export function LoginButton() {
  const { authToken } = useSelector(getUserDataSelector);

  if (!authToken) return <LoggedOut />;

  return <LoggedIn />;
}
