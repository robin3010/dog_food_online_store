// import clsx from 'clsx';
import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../logo.png';

export const Header = memo(() => {
  console.log('Render Header');

  return (
    // <header>
    <header className="navbar navbar-expand-sm">
      <div className={`m-2 container-fluid ${styles.header__nav}`}>
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="60"
            className="d-inline-block align-text-center me-2"
          />
          <span
            className="align-middle"
            style={{
              fontFamily: "'Comfortaa', cursive",
              fontSize: '1.4rem',
            }}
          >
            Dog Food
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none' }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/products" className="nav-link">
              Товары
            </NavLink>
            <NavLink to="/delivery" className="nav-link">
              Доставка
            </NavLink>
            <NavLink to="/contacs" className="nav-link me-auto">
              Контакты
            </NavLink>
          </div>
        </div>
        <div className="d-flex align-items-center gap-5">
          <NavLink to="/favorite" className="nav-link">
            <i className="fa-regular fa-heart fa-lg" />
          </NavLink>
          <NavLink to="/login" className="nav-link">
            <i className="fa-solid fa-user fa-lg" />
          </NavLink>
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
            <i className="fa-solid fa-shopping-cart fa-lg" />
          </NavLink>
        </div>
      </div>
    </header>
    // </header>
  );
});
