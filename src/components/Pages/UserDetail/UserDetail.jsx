import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { shopApi } from '../../../api/shopApi';
import { getUserDataSelector } from '../../../redux/slices/userSlice';
import { getUserInfoQueryKey } from '../../../utils/queryUtils';
import { removeExtraWhitespaces } from '../../../utils/utils';
import { FloatingInput } from '../../Forms/FormInputs/FloatingInput';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { EditUserAvatarModal } from '../../Modals/EditUserAvatarModal/EditUserAvatarModal';
import { editUserInfoValidationScheme } from './userInfoValidation';

/* eslint-disable jsx-a11y/label-has-associated-control */
export function UserDetail() {
  const {
    authToken, name, about, email, group, avatar,
  } = useSelector(getUserDataSelector);

  const queryClient = useQueryClient();

  const {
    mutateAsync, isLoading, isError, error, reset,
  } = useMutation({
    mutationFn: ({ userPic, ...editedUserData }) => {
      console.log({ editedUserData });
      shopApi.editUserInfo(authToken, group, editedUserData, userPic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey(),
      });
    },
  });

  const editHandler = async (values) => {
    const formattedValues = Object.entries(values).reduce((acc, curr) => ({
      ...acc,
      [curr[0]]: removeExtraWhitespaces(curr[1]),
    }), {});

    await mutateAsync(formattedValues);
  };

  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);

  const openEditUserAvatarModalHandler = () => {
    setIsEditAvatarModalOpen(true);
  };

  return (
    <>
      <h3 className="mb-3">Профиль</h3>
      <div className="card p-4">
        <div className="row g-0 justify-content-evenly">
          <div className="col-12 col-lg-auto user__detail">
            <div className="d-flex justify-content-center">
              <button
                onClick={openEditUserAvatarModalHandler}
                type="button"
                className="position-relative border border-0 p-0"
              >
                <div className="overlayable_content">
                  <div className="user__detail-img">
                    <img
                      src={avatar}
                      className="img-fluid rounded"
                      alt="..."
                    />
                    <div className="overlay-action">
                      <i className="fa-regular fa-pen-to-square fa-4x" />
                    </div>
                  </div>
                </div>
              </button>
            </div>

          </div>
          <EditUserAvatarModal
            isOpen={isEditAvatarModalOpen}
            setIsOpen={setIsEditAvatarModalOpen}
            mutateUserAvatar={mutateAsync}
            isLoading={isLoading}
            isError={isError}
            error={error}
            reset={reset}
            avatar={avatar}
          />
          <div className="col-lg-6">
            <div className="card-body p-lg-0">
              <Formik
                initialValues={{ name, about }}
                validationSchema={editUserInfoValidationScheme}
                enableReinitialize
                onSubmit={editHandler}
              >
                <Form>
                  <div className="form-floating mb-3">
                    <FloatingInput
                      name="name"
                      placeholder="Имя пользователя"
                      label="Имя пользователя"
                    />
                  </div>
                  <div className="form-floating fix-overlap mb-3">
                    <FloatingInput
                      component="textarea"
                      name="about"
                      placeholder="О себе"
                      label="О себе"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email ?? ''}
                      disabled
                    />
                    <label htmlFor="email">E-mail</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="group"
                      value={group ?? ''}
                      disabled
                    />
                    <label htmlFor="group">Группа</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary d-block mx-auto"
                  >
                    Сохранить
                  </button>
                </Form>
              </Formik>
              {isLoading && <ModalLoader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
