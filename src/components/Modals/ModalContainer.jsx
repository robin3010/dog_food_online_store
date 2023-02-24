import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalContainer.module.css';

function ModalContent({ closeHandler, children }) {
  useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === 'Escape') {
        e.target.blur();
        closeHandler();
      }
    };

    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  const closeByXmark = () => closeHandler();

  return (
    <div className={`card ${styles.modal__content}`}>
      {children}
      <button
        onClick={closeByXmark}
        type="button"
        className={styles['modal__button-close']}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}

export function ModalContainer({ isOpen, closeHandler, children }) {
  if (!isOpen) return null;

  const closeByClickContainer = (e) => {
    if (e.currentTarget === e.target) {
      closeHandler();
    }
  };

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={closeByClickContainer}
      className={styles.modal__container}
    >
      <ModalContent closeHandler={closeHandler}>
        {children}
      </ModalContent>
    </div>,
    document.getElementById('modal-container'),
  );
}
