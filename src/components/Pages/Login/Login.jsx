import { Outlet } from 'react-router-dom';
import './Login.css';

export function Login() {
  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong">
          <div className="card-body p-5 text-center login__card">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
