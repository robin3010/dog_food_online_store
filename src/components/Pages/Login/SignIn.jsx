import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { signInValidationScheme } from './loginValidation';
import { LoginErrorAlert } from '../../Errors/LoginErrorAlert';
import { shopApi } from '../../../api/shopApi';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { login } from '../../../redux/slices/userSlice';
import { updateValue } from '../../../redux/slices/isSessionSlice';

const initialValues = {
  email: '',
  password: '',
  remember: false,
};

/* eslint-disable jsx-a11y/label-has-associated-control */
export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (userData) => shopApi.signIn(userData),
    // onSuccess: ({ data }) => saveUserData(data),
  });

  const signInHandler = async (values) => {
    const { email, password } = values;
    const validData = {
      email,
      password,
    };

    dispatch(updateValue(values.remember));
    dispatch(login(await mutateAsync(validData)));

    navigate('/products');

    // setTimeout(() => navigate('/products'));
  };

  return (
    <>
      <h2 className="fw-bold mb-2 text-uppercase">Авторизация</h2>
      <p className="text-black-50 mb-4">Введите e-mail и пароль</p>

      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationScheme}
        onSubmit={signInHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                type="email"
                className={clsx('form-control', {
                  'is-invalid': errors.email && touched.email,
                  'is-valid': !errors.email && touched.email,
                })}
                name="email"
                placeholder="E-mail"
              />
              <label htmlFor="email">E-mail</label>
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-floating mb-3">
              <Field
                type="password"
                className={clsx('form-control', {
                  'is-invalid': errors.password && touched.password,
                  'is-valid': !errors.password && touched.password,
                })}
                name="password"
                placeholder="Пароль"
              />
              <label htmlFor="password">Пароль</label>
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-check d-flex justify-content-start mb-3">
              <Field
                type="checkbox"
                className="form-check-input"
                name="remember"
                id="remember"
              />
              <label className="form-check-label user-select-none ps-2" htmlFor="remember">
                Запомнить меня
              </label>
            </div>
            <div className="d-grid gap-2">
              <LoginErrorAlert loginError={isError} error={error} />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={Object.keys(errors).length > 0 || !touched.email || isLoading}
              >
                Войти
              </button>
              <NavLink
                to="/login/signup"
                type="button"
                className="btn btn-outline-secondary"
              >
                Регистрация
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
      {isLoading && <ModalLoader />}
    </>
  );
}
