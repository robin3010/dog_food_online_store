import { Loader } from '../Loaders/Loader';
import loginStyles from '../Pages/Login/Login.module.css';

export const withQuery = (WrappedComponent) => function withQueryFunc({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isError) {
    return (
      <div className="container p-3 p-md-4 p-lg-5 d-flex
      flex-column
      justify-content-center
      align-items-center
      m-auto
      text-center"
      >
        <h5 className="text-break mb-3">
          {error.message || 'Ошибка. Попробуйте позже'}
        </h5>
        <button
          type="button"
          onClick={refetch}
          className={`btn ${loginStyles['btn-login-primary']}`}
          disabled={isLoading}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return <WrappedComponent {...rest} />;
};
