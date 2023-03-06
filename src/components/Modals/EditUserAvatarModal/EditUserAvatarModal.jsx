import { Form, Formik } from 'formik';
import { FetchErrorAlert } from '../../Forms/Errors/FetchErrorAlert';
import { FloatingInput } from '../../Forms/FormInputs/FloatingInput';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { editUserAvatarValidationScheme } from '../../Pages/UserDetail/userInfoValidation';
import { ModalContainer } from '../ModalContainer';

export function EditUserAvatarModal({
  isOpen, setIsOpen, mutateUserAvatar, isLoading, isError, error, reset, avatar,
}) {
  const closeEditUserAvatarModalHandler = () => {
    setIsOpen(false);
    reset();
  };

  const submitEditedAvatarHandler = async (values) => {
    await mutateUserAvatar({ ...values, userPic: true });

    if (!isError && !isLoading) {
      closeEditUserAvatarModalHandler();
    }
  };

  return (
    <ModalContainer isOpen={isOpen} closeHandler={closeEditUserAvatarModalHandler}>
      <h5 className="card-header text-center">
        Изменение аватара
      </h5>
      <div className="card-body" style={{ minWidth: '50vw' }}>
        <Formik
          initialValues={{ avatar }}
          validationSchema={editUserAvatarValidationScheme}
          onSubmit={submitEditedAvatarHandler}
        >
          <Form className="row g-3">
            <div className="form-floating mb-3">
              <FloatingInput
                name="avatar"
                placeholder="Аватар (URL)"
                label="Аватар (URL)"
              />
            </div>
            <div className="mt-2">
              <FetchErrorAlert isError={isError} error={error} />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary d-block mx-auto"
              >
                Сохранить
              </button>
            </div>
          </Form>
        </Formik>
        {isLoading && <ModalLoader />}
      </div>
    </ModalContainer>
  );
}
