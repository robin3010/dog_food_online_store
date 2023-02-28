import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import { getUserDataSelector, logout, setUserInfo } from '../../../redux/slices/userSlice';
import { shopApi } from '../../../api/shopApi';
import { renameIdKey, setAvatar } from '../../../utils/utils';

function LoggedIn() {
  const userInfo = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

  const defaultFirstName = 'Покупатель';

  const firstName = userInfo?.name.replace(/\s.*/, '') || defaultFirstName;
  const avatar = setAvatar(userInfo.avatar);

  return (
    <div className="btn-group">
      <button
        className="nav-link dropdown-toggle bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        data-bs-auto-close="true"
        aria-expanded="false"
      >
        <img
          src={avatar}
          alt=""
          className={clsx(
            'rounded-circle',
            'bg-tertiary',
            'bg-opacity-10',
            'opacity-75',
            'header__user-avatar',
          )}
        />
      </button>
      <ul className="dropdown-menu dropdown-menu-sm-end text-center">
        <li>
          <Link to="/user" className="btn nav-link dropdown-item fw-semibold text-decoration-none">
            {firstName}
          </Link>
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
  const { authToken, group } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

  useQuery({
    queryKey: ['fetchUserInfo'],
    queryFn: () => shopApi.getUserInfo(authToken, group),
    enabled: !!authToken,
    // keepPreviousData: true,
    onSuccess: (res) => {
      dispatch(setUserInfo(res));
      renameIdKey(res);
    },
  });

  if (!authToken) return <LoggedOut />;

  return (
    <LoggedIn />
  );
}
