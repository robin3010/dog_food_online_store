import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { signUpValidationScheme } from './loginValidation';
import styles from './Login.module.css';
import { LoginErrorAlert } from '../../Errors/LoginErrorAlert';
import { shopApi } from '../../../api/shopApi';

const initialValues = {
  email: '',
  group: '',
  password: '',
  confirmPassword: '',
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export function SignUp() {
  const navigate = useNavigate();

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (userData) => shopApi.signUp(userData),
  });

  const signUpHandler = async (values) => {
    const { email, password, group } = values;
    const validData = {
      email,
      password,
      group,
    };
    console.log(validData);

    await mutateAsync(validData);
    if (!isError) {
      navigate('..', {
        relative: 'path',
      });
    }
  };

  return (
    <>
      <h2 className="fw-bold mb-2 text-uppercase">Регистрация</h2>
      <p className="text-black-50 mb-4">Введите регистрационные данные</p>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationScheme}
        onSubmit={signUpHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <Field
                    type="email"
                    className={clsx('form-control', {
                      'is-invalid': errors.email && touched.email,
                    })}
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
                    className={clsx('form-control', {
                      'is-invalid': errors.group && touched.group,
                    })}
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
                className={clsx('form-control', {
                  'is-invalid': errors.password && touched.password,
                })}
                name="password"
                placeholder="Пароль"
              />
              <label htmlFor="password">Пароль</label>
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div className="form-floating mb-3">
              <Field
                type="password"
                className={clsx('form-control', {
                  'is-invalid': errors.confirmPassword && touched.confirmPassword,
                })}
                name="confirmPassword"
                placeholder="Подтвердите пароль"
              />
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="d-grid gap-2">
              <LoginErrorAlert loginError={isError} error={error} />
              <button
                type="submit"
                className={`btn ${styles['btn-login-primary']}`}
                disabled={Object.keys(errors).length > 0 || !touched.email || isLoading}
              >
                Зарегистрироваться
              </button>
              <NavLink
                to="/login/signin"
                type="button"
                className={`btn ${styles['btn-login-outline-secondary']}`}
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
