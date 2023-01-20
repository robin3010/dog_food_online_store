import { Outlet } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {
  return (
    <section className="bg-body-secondary">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className={`card-body p-5 text-center ${styles.login__card}`}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
