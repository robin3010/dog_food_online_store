import { memo } from 'react';
import './Footer.module.css';

export const Footer = memo(() => {
  console.log('Render Footer');

  return (
    <footer>
      <div className="footer mt-auto d-flex gap-5 p-5">
        <div>
          <h3>Lorem.</h3>
          <p>Quos?</p>
          <p>Sunt!</p>
          <p>Placeat!</p>
        </div>
        <div>
          <h3>Lorem.</h3>
          <p>Possimus?</p>
          <p>Fugiat.</p>
          <p>Temporibus!</p>
        </div>
        <div>
          <h3>Lorem.</h3>
          <p>Incidunt?</p>
          <p>Earum.</p>
          <p>Similique!</p>
        </div>
        <div className="ms-auto">
          <h3>Lorem.</h3>
          <p>Expedita?</p>
          <p>Est.</p>
          <p>Ad.</p>
        </div>
      </div>
      <div className="text-center">
        <hr />
        <p>© 2023 Dog Food</p>
      </div>
    </footer>
  );
});
