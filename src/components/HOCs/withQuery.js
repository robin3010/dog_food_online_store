import { Loader } from '../Loaders/Loader';
import { ModalLoader } from '../Loaders/ModalLoader';
import '../../css/buttons.css';

export const withQuery = (WrappedComponent) => function withQueryFunc({
  isLoading, isFetching, isError, error, refetch, ...rest
}) {
  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="card py-4 text-center">
        <h5 className="text-break mb-3">
          {error.message || 'Ошибка. Попробуйте позже'}
        </h5>
        <button
          type="button"
          onClick={refetch}
          className="btn mx-auto btn-primary"
          disabled={isLoading}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <>
        <WrappedComponent {...rest} />
        <ModalLoader />
      </>
    );
  }

  return <WrappedComponent {...rest} />;
};
