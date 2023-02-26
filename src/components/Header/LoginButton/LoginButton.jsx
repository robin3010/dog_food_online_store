import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import { getUserDataSelector, logout, setUserInfo } from '../../../redux/slices/userSlice';
import { shopApi } from '../../../api/shopApi';
import { renameIdKey } from '../../../redux/reduxUtils/reduxUtils';
import defaultAvatar from '../../../images/default_avatar.png';

function LoggedIn() {
  const userInfo = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

  const defaultApiAvatar = 'https://react-learning.ru/image-compressed/default-image.jpg';
  const defaultFirstName = 'Покупатель';

  const setAvatar = () => {
    if (userInfo.avatar === defaultApiAvatar || !userInfo.avatar) {
      return defaultAvatar;
    }
    return userInfo.avatar;
  };

  const firstName = userInfo?.name.replace(/\s.*/, '') || defaultFirstName;
  const avatar = setAvatar();

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
            'rounded-5',
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

  // const userInfo = isLoading ? getInitState().user : data;
  // console.log(getInitState().user);

  return (
    <LoggedIn />
  );
}
