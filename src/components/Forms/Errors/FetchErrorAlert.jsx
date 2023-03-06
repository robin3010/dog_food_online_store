import './FetchErrorAlert.css';

export function FetchErrorAlert({ isError, error }) {
  if (isError) {
    return (
      <div className="alert alert-danger fetch-error__alert" role="alert">
        {error.message}
      </div>
    );
  }
}
