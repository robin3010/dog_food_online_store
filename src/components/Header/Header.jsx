import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import { getCheckoutSelector } from '../../redux/slices/checkoutSlice';
import { getAuthTokenSelector } from '../../redux/slices/userSlice';
import { getItemsIds } from '../../utils/checkout&wishlistUtils/checkout&wishlistUtils';
import { LoginButton } from './LoginButton/LoginButton';
import './Header.css';
import { getWishlistSelector } from '../../redux/slices/wishlistSlice';

export const Header = memo(() => {
  console.log('Render Header');

  const checkoutCount = getItemsIds(useSelector(getCheckoutSelector)).length;
  const wishlistCount = getItemsIds(useSelector(getWishlistSelector)).length;
  const authToken = useSelector(getAuthTokenSelector);
  console.log({ checkoutCount, authToken });

  return (
    <header className="main__header navbar navbar-expand-md">
      <div
        className="
        container-fluid
        d-flex
        header__nav
        m-2
        mx-5
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
        <div
          className="
          header__nav__user-btns
          d-flex align-items-center
          gap-0 gap-sm-1 gap-md-2 gap-lg-4
          ms-sm-auto
          me-sm-4 me-md-0
          order-md-3
          fa-lg"
        >
          <NavLink to="/favorite" className="nav-link position-relative">
            <span
              className={clsx(
                'position-absolute top-0 start-100 fs-6',
                'translate-middle',
                'badge',
                'rounded-circle',
                { 'rounded-pill': wishlistCount > 9 },
                'cart__couter-icon bg-gradient',
                { 'd-none': !wishlistCount || !authToken },
              )}
            >
              {wishlistCount}
            </span>
            <i className="fa-solid fa-heart" />
          </NavLink>
          <LoginButton />
          <NavLink to="/checkout" className="nav-link position-relative">
            <span
              className={clsx(
                'position-absolute top-0 start-100 fs-6',
                'translate-middle',
                'badge',
                'rounded-circle',
                { 'rounded-pill': checkoutCount > 9 },
                'cart__couter-icon bg-gradient',
                { 'd-none': !checkoutCount || !authToken },
              )}
            >
              {checkoutCount}
            </span>
            <i className="fa-solid fa-shopping-cart" />
          </NavLink>
        </div>
        <button
          className="navbar-toggler order-md-4"
          style={{ marginRight: '-1.65rem' }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse order-md-2"
          id="navbarNav"
        >
          <div className="
          navbar-nav
          d-flex
          align-items-center
          align-items-sm-start
          header__nav__links"
          >
            <NavLink
              to="/products"
              className="nav-link"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Товары
              </span>
            </NavLink>
            <NavLink
              to="/delivery"
              className="nav-link"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Доставка
              </span>
            </NavLink>
            <NavLink
              to="/contacts"
              className="nav-link"
            >
              <span
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Контакты
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
});
