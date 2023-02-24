import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ModalContainer } from '../ModalContainer';
import '../../../css/buttons.css';
import { removeFromCart } from '../../../redux/slices/checkoutSlice';

export function DeleteItemsModal({
  isOpen, setIsOpen, name: title, ids,
}) {
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const closeDeleteModal = () => {
    setIsOpen(false);
  };

  const deleteHandler = () => {
    dispatch(removeFromCart(ids));
    closeDeleteModal();
    // navigate('..', {
    //   relative: 'path',
    // });
  };

  return (

    <ModalContainer isOpen={isOpen} closeHandler={closeDeleteModal}>
      <>
        <h5 className="card-header text-center">
          Подтверждение
        </h5>
        <div className="card-body">
          <p className="text-center">
            {'Удалить товар '}
            <b>
              &quot;
              {title}
              &quot;?
            </b>
          </p>
          <div className="d-flex justify-content-center gap-2">
            <button
              onClick={deleteHandler}
              type="button"
              className="btn btn-primary"
            >
              Удалить
            </button>
            <button
              onClick={closeDeleteModal}
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
