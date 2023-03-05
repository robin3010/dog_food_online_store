import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ModalContainer.css';

function ModalContent({ closeHandler, children }) {
  useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === 'Escape') {
        e.target.blur();
        closeHandler();
      }
    };

    document.addEventListener('keydown', closeByEsc);
    document.body.classList.add('overflow__hidden');
    return () => {
      document.removeEventListener('keydown', closeByEsc);
      document.body.classList.remove('overflow__hidden');
    };
  }, []);

  const closeByXmark = () => closeHandler();

  return (
    <div className="card modal__content">
      {children}
      <button
        onClick={closeByXmark}
        type="button"
        className="modal__button-close"
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
      className="modal__container"
    >
      <ModalContent closeHandler={closeHandler}>
        {children}
      </ModalContent>
    </div>,
    document.getElementById('modal-container'),
  );
}
