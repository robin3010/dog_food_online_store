import { Field, Form, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { signInValidationScheme } from '../../Pages/Login/loginValidation';
import { FetchErrorAlert } from '../Errors/FetchErrorAlert';
import { FloatingInput } from '../FormInputs/FloatingInput';

export function SignInForm({
  signInHandler, isLoading, isError, error,
}) {
  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      validationSchema={signInValidationScheme}
      onSubmit={signInHandler}
    >
      {({ isValid }) => (
        <Form className="row g-3">
          <div className="col-12 form-floating mb-3">
            <FloatingInput
              type="email"
              name="email"
              placeholder="E-mail"
              label="E-mail"
              autoComplete="on"
            />
          </div>
          <div className="col-12 form-floating mb-3">
            <FloatingInput
              type="password"
              name="password"
              placeholder="Пароль"
              label="Пароль"
            />
          </div>
          <div className="col form-check d-flex justify-content-start mb-3 ms-2">
            <Field
              type="checkbox"
              className="form-check-input ps-2"
              name="remember"
              id="remember"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="form-check-label user-select-none ps-2" htmlFor="remember">
              Запомнить меня
            </label>
          </div>
          <div className="d-grid gap-2">
            <FetchErrorAlert isError={isError} error={error} />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isLoading}
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
  );
}
