import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { NavLink } from 'react-router-dom';
import { signInValidationScheme } from './loginValidation';

const initialValues = {
  email: '',
  password: '',
  remember: false,
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export function SignIn() {
  return (
    <>
      <h2 className="fw-bold mb-2 text-uppercase">Авторизация</h2>
      <p className="text-black-50 mb-4">Введите e-mail и пароль</p>

      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationScheme}
        onSubmit={(values) => console.log({ values })}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                type="email"
                className={
                `form-control${
                  errors.email && touched.email ? ' is-invalid' : ''}`
              }
                name="email"
                placeholder="E-mail"
              />
              <label htmlFor="email">E-mail</label>
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <div className="form-floating mb-3">
              <Field
                type="password"
                className={
                  `form-control${
                    errors.password && touched.password ? ' is-invalid' : ''}`
                }
                name="password"
                placeholder="Пароль"
              />
              <label htmlFor="password">Пароль</label>
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-check d-flex justify-content-start mb-3">
              <Field type="checkbox" className="form-check-input" name="remember" />
              <label className="form-check-label ps-2" htmlFor="remember">
                Запомнить меня
              </label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Войти
              </button>
              <NavLink
                to="/login/signup"
                type="button"
                className="btn btn-light text-primary-emphasis bg-dark-subtle"
              >
                Регистрация
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>

    </>
  );
}
