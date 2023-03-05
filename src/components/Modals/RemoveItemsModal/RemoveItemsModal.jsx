import { useDispatch } from 'react-redux';
import { ModalContainer } from '../ModalContainer';
import './RemoveItemsModal.css';
import { removeTypeConfig, REMOVE_TYPE_DATASET } from './removeItemsModalUtils';

export function RemoveItemsModal({
  isOpen, setIsOpen, ids, type = REMOVE_TYPE_DATASET.item, name: title, actionFn,
}) {
  const dispatch = useDispatch();

  const closeRemoveModal = () => {
    setIsOpen(false);
  };

  const removeHandler = () => {
    dispatch(actionFn ?? removeTypeConfig[type].func(ids));
    closeRemoveModal();
  };

  return (

    <ModalContainer isOpen={isOpen} closeHandler={closeRemoveModal}>
      <div className="remove-items">
        <h5 className="card-header text-center">
          Подтверждение
        </h5>
        <div className="card-body">
          <p className="text-center">
            {removeTypeConfig[type]?.message}
            { type === REMOVE_TYPE_DATASET.item && (
            <b>{`\u00AB${title}\u00BB`}</b>
            ) }
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
      </div>
    </ModalContainer>

  );
}
