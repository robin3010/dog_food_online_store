/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = memo(() => (
  <footer className="main__footer">
    <section
      className="
          d-flex
          justify-content-center
          justify-content-md-evently
          p-3
          border-bottom"
    >
      <div className="me-5 d-none d-md-block">
        <span>Мы на связи:</span>
      </div>

      <div className="fa-lg">
        <Link href="#" className="me-4 link-secondary">
          <i className="fa-brands fa-telegram" />
        </Link>
        <Link href="#" className="me-4 link-secondary">
          <i className="fa-brands fa-whatsapp" />
        </Link>
        <Link href="#" className="me-4 link-secondary">
          <i className="fa-brands fa-viber" />
        </Link>
        <Link href="#" className="me-4 link-secondary">
          <i className="fab fa-instagram" />
        </Link>
        <Link href="#" className="me-4 link-secondary">
          <i className="fa-brands fa-vk" />
        </Link>
      </div>
    </section>

    <section>
      <div className="container text-center text-md-start mt-4">
        <div className="row mt-3">
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Компания</h6>
            <Link to="#" className="nav-link pb-2 disabled">
              О нас
            </Link>
            <Link to="#" className="nav-link pb-2 disabled">
              Новости
            </Link>
            <Link to="#" className="nav-link pb-2 disabled">
              Отзывы
            </Link>
            <Link to="#" className="nav-link pb-2 disabled">
              Гарантия
            </Link>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Помощь</h6>
            <Link to="/products?tags=sale" className="nav-link pb-2">
              Акции
            </Link>
            <Link to="/delivery" className="nav-link pb-2">
              Доставка и оплата
            </Link>
            <Link to="#" className="nav-link pb-2 disabled">
              Система скидок
            </Link>
            <Link to="#" className="nav-link pb-2 disabled">
              Как заказать
            </Link>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Контакты</h6>
            <a
              href="mailto:mail@dogfood.shop"
              className="
                  nav-link
                  pb-2
                  d-flex
                  align-items-center
                  justify-content-center
                  justify-content-md-start"
            >
              <i className="fas fa-envelope me-3 text-secondary" />
              mail@dogfood.shop
            </a>
            <p>
              <i className="fas fa-phone me-3 text-secondary" />
              {' '}
              8 800 555 35
              35
            </p>
          </div>
        </div>
      </div>
    </section>
    <div className="text-center pb-3">
      <hr />
      <div
        className="
          d-flex
          justify-content-center
          flex-column
          flex-md-row
          my-0
          align-middle
          brand-text"
      >
        <span>© 2023 Интернет-магазин</span>
        <span className="ms-md-1">Dog Food</span>
      </div>
    </div>
  </footer>
));
