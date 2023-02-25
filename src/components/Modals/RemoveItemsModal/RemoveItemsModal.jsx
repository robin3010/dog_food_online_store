import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { ModalContainer } from '../ModalContainer';
import '../../../css/buttons.css';
import { removeTypeConfig, REMOVE_TYPE_DATASET } from '../modalsUtils';

export function RemoveItemsModal({
  isOpen, setIsOpen, ids, type = REMOVE_TYPE_DATASET.item, name: title,
}) {
  const dispatch = useDispatch();

  const closeRemoveModal = () => {
    setIsOpen(false);
  };

  const removeHandler = () => {
    dispatch(removeTypeConfig[type].func(ids));
    closeRemoveModal();
  };

  return (

    <ModalContainer isOpen={isOpen} closeHandler={closeRemoveModal}>
      <>
        <h5 className="card-header text-center">
          Подтверждение
        </h5>
        <div className="card-body">
          <p className="text-center">
            {removeTypeConfig[type]?.message}
            <b className={clsx(
              { 'd-none': type !== REMOVE_TYPE_DATASET.item },
            )}
            >
              &quot;
              {title}
              &quot;
            </b>
            ?
          </p>
          <div className="d-flex justify-content-center gap-2">
            <button
              onClick={removeHandler}
              type="button"
              className="btn btn-primary"
            >
              {removeTypeConfig[type]?.buttonTitle}
            </button>
            <button
              onClick={closeRemoveModal}
              type="button"
              className="btn btn-outline-secondary"
            >
              Отмена
            </button>
          </div>
        </div>
      </>
    </ModalContainer>

  );
}
