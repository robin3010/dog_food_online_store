// import clsx from 'clsx';
import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useMutation } from '@tanstack/react-query';
import logo from '../../logo.png';
// import { shopApi } from '../../api/shopApi';
import { LoginButton } from './LoginButton/LoginButton';
// import { useAuthTokenContext } from '../../context/AuthTokenContext';

export const Header = memo(() => {
  console.log('Render Header');

  // const { userData } = useAuthTokenContext();

  // <ТЕСТ>
  // Запрос данных пользователя с сервера
  // вызов без аргумента возвращает объект
  // вызов с аргументом = конкретные данные из объекта пользователя
  // const { mutateAsync } = useMutation({
  //   mutationFn: (property) => shopApi.getUserInfo(userData.group, property),
  // });

  // const getInfo = async (property) => {
  //   await mutateAsync(property);
  // };
  // </ТЕСТ>

  return (
    <header className="main__header navbar navbar-expand-md">
      <div className="
        container-fluid
        d-flex
        header__nav m-2
        justify-content-sm-start
        justify-content-md-between"
      >
        <Link to="/" className="navbar-brand me-0 me-sm-2">
          <img
            src={logo}
            alt="Logo"
            width="60px"
            className="d-inline-block align-text-center me-0 me-sm-2"
          />
          <span className="navbar__brand-text align-middle d-none d-sm-inline">
            Dog Food
          </span>
        </Link>
        <div className="
          d-flex align-items-center
          gap-1
          gap-sm-2
          gap-md-4
          gap-lg-5
          ms-sm-auto
          order-md-3"
        >
          <NavLink to="/favorite" className="nav-link">
            <i className="fa-regular fa-heart fa-xl" />
          </NavLink>
          {/* <button onClick={() => getInfo('avatar')} type="button" className="btn nav-link">
            ТЕСТ
          </button> */}
          <LoginButton />
          <NavLink to="/shopping-cart" className="nav-link position-relative">
            {/* <span
              className={clsx(
                'position-absolute',
                'translate-middle',
                'badge',
                'rounded-pill',
                'bg-danger',
                [styles.navbar__badge],
              )}
            >
              1
            </span> */}
            <i className="fa-solid fa-shopping-cart fa-xl" />
          </NavLink>
        </div>
        <button
          className="navbar-toggler order-md-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse order-md-2"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav d-flex align-items-center align-items-sm-start">
            <NavLink to="/products" className="nav-link">
              Товары
            </NavLink>
            <NavLink to="/delivery" className="nav-link">
              Доставка
            </NavLink>
            <NavLink to="/contacts" className="nav-link">
              Контакты
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
});
