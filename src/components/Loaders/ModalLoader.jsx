import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import loaderStyles from './Loader.module.css';

export function ModalLoader() {
  useEffect(() => {
    document.body.classList.add('overflow__hidden');

    return () => {
      document.body.classList.remove('overflow__hidden');
    };
  }, []);

  return createPortal(
    <div className={loaderStyles.modal__loader_container}>
      <div className={loaderStyles.modal__loader_content}>
        <div className={loaderStyles['lds-ellipsis']}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>,
    document.getElementById('modal-container'),
  );
}
