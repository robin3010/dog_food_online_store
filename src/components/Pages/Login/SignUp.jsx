import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { shopApi } from '../../../api/shopApi';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { SignUpForm } from '../../Forms/SignUpForm/SignUpForm';

export function SignUp() {
  const navigate = useNavigate();

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (userData) => shopApi.signUp(userData),
  });

  const signUpHandler = async (values) => {
    const { email, password, group } = values;
    const validData = {
      email,
      password,
      group,
    };

    await mutateAsync(validData);
    if (!isError && !isLoading) {
      navigate('..', {
        relative: 'path',
      });
    }
  };

  return (
    <>
      <h2 className="fw-bold mb-2 text-main text-uppercase">Регистрация</h2>
      <p className="text-black-50 mb-4">Введите регистрационные данные</p>
      <SignUpForm
        signUpHandler={signUpHandler}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {isLoading && <ModalLoader />}

    </>
  );
}
