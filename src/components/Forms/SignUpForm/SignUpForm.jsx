import { Form, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { signUpValidationScheme } from '../../Pages/Login/loginValidation';
import { FetchErrorAlert } from '../Errors/FetchErrorAlert';
import { FloatingInput } from '../FormInputs/FloatingInput';

export function SignUpForm({
  signUpHandler, isLoading, isError, error,
}) {
  const initialValues = {
    email: '',
    group: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      validationSchema={signUpValidationScheme}
      onSubmit={signUpHandler}
    >
      {({ isValid }) => (
        <Form className="row g-3">
          <div className="col-12 col-md-8">
            <div className="form-floating mb-3">
              <FloatingInput
                type="email"
                name="email"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-floating mb-3">
              <FloatingInput
                name="group"
                placeholder="Группа"
              />
            </div>
          </div>
          <div className="col-12 form-floating mb-3">
            <FloatingInput
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>
          <div className="col-12 form-floating mb-3">
            <FloatingInput
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
            />
          </div>
          <div className="d-grid gap-2">
            <FetchErrorAlert isError={isError} error={error} />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isLoading}
            >
              Зарегистрироваться
            </button>
            <NavLink
              to="/login/signin"
              type="button"
              className="btn btn-outline-secondary"
            >
              Уже зарегистрированы? Войти
            </NavLink>
          </div>
        </Form>
      )}
    </Formik>
  );
}
