import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import {
  ErrorMessage, Field, Formik, Form,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { shopApi } from '../../../api/shopApi';
import { getUserDataSelector, setUserInfo } from '../../../redux/slices/userSlice';
import { removeExtraWhitespaces } from '../../../utils/utils';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { editUserInfoValidationScheme } from './userInfoValidation';

/* eslint-disable jsx-a11y/label-has-associated-control */
export function UserDetail() {
  const userInfo = useSelector(getUserDataSelector);
  const {
    authToken, name, about, email, group,
  } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

  const initialValues = {
    name,
    about,
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (editedUserData) => shopApi.editUserInfo(authToken, group, editedUserData),
  });

  const editHandler = async (values) => {
    const formattedValues = Object.entries(values).reduce((acc, curr) => ({
      ...acc,
      [curr[0]]: removeExtraWhitespaces(curr[1]),
    }), {});

    dispatch(setUserInfo(await mutateAsync(formattedValues)));
  };

  return (
    <>
      <h3 className="mb-3">Профиль</h3>
      <div className="card p-4">
        <div className="row g-0 justify-content-evenly">
          <div className="col-12 col-lg-auto">
            <img
              src={userInfo.avatar}
              className="img-fluid rounded d-block mx-auto"
              alt="..."
            />
          </div>
          <div className="col-lg-6">
            <div className="card-body p-lg-0">
              <Formik
                initialValues={initialValues}
                validationSchema={editUserInfoValidationScheme}
                enableReinitialize
                onSubmit={editHandler}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        type="text"
                        className={clsx('form-control', {
                          'is-invalid': errors.name,
                          'is-valid': !errors.name && touched.name,
                        })}
                        name="name"
                        placeholder="Имя пользователя"
                      />
                      <label htmlFor="name">Имя пользователя</label>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        component="textarea"
                        className={clsx('form-control', {
                          'is-invalid': errors.about,
                          'is-valid': !errors.about && touched.about,
                        })}
                        name="about"
                        placeholder="О себе"
                      />
                      <label htmlFor="about">О себе</label>
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="invalid-feedback"
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
                )}
              </Formik>
              {isLoading && <ModalLoader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}