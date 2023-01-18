import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { NavLink } from 'react-router-dom';
import { signUpValidationScheme } from './loginValidation';

const initialValues = {
  email: '',
  group: '',
  password: '',
  confirmPassword: '',
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export function SignUp() {
  return (
    <>
      <h2 className="fw-bold mb-2 text-uppercase">Регистрация</h2>
      <p className="text-black-50 mb-4">Введите e-mail и пароль</p>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationScheme}
        onSubmit={(values) => console.log({ values })}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row g-2">
              <div className="col-md">
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
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <Field
                    type="text"
                    className={
                    `form-control${
                      errors.group && touched.group ? ' is-invalid' : ''}`
                  }
                    name="group"
                    placeholder="Группа"
                  />
                  <label htmlFor="group">Группа</label>
                  <ErrorMessage name="group" component="div" className="invalid-feedback" />
                </div>
              </div>
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
            <div className="form-floating mb-3">
              <Field
                type="password"
                className={
                  `form-control${
                    errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''}`
                }
                name="confirmPassword"
                placeholder="Подтвердите пароль"
              />
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Зарегистрироваться
              </button>
              <NavLink
                to="/login/signin"
                type="button"
                className="btn btn-light text-primary-emphasis bg-dark-subtle"
              >
                Уже зарегистрированы? Войти
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>

    </>
  );
}
