import styles from '../Pages/Login/Login.module.css';

export function LoginErrorAlert({ loginError, error }) {
  if (loginError) {
    return (
      <div className={`alert alert-danger ${styles.login__alert}`} role="alert">
        {error.message}
      </div>
    );
  }
}
