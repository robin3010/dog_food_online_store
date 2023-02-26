import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  const { pathname } = useLocation();
  console.log({ pathname });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <section className="bg-body-secondary d-flex flex-grow-1">
        <div className={clsx(
          { 'container p-3 p-md-4 py-lg-5': pathname !== '/' },
          { 'container-fluid d-flex p-0': pathname === '/' },
        )}
        >
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
