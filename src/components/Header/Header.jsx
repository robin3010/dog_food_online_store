import clsx from 'clsx';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = memo(() => {
  console.log('Render Header');

  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid py-3">
          <div className={clsx(
            'navbar-nav',
            [styles.header__nav],
          )}
          >
            <NavLink Link to="/" className="nav-link">
              <i className="fa-solid fa-house" />
            </NavLink>
            <NavLink to="/products" className="nav-link">Товары</NavLink>
            <NavLink to="/login" className="nav-link">Login</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
});
