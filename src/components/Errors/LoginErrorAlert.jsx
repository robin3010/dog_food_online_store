export function LoginErrorAlert({ loginError, error }) {
  if (loginError) {
    return (
      <div className="alert alert-danger login__alert" role="alert">
        {error.message}
      </div>
    );
  }
}
