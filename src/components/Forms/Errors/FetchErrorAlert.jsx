export function FetchErrorAlert({ isError, error }) {
  if (isError) {
    return (
      <div className="alert alert-danger login__alert" role="alert">
        {error.message}
      </div>
    );
  }
}
