import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { shopApi } from '../../../api/shopApi';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { login } from '../../../redux/slices/userSlice';
import { setIsSession } from '../../../redux/slices/isSessionSlice';
import { SignInForm } from '../../Forms/SignInForm/SignInForm';

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (userData) => shopApi.signIn(userData),
  });

  const signInHandler = async (values) => {
    const { email, password } = values;
    const validData = {
      email,
      password,
    };

    dispatch(setIsSession(values.remember));
    dispatch(login(await mutateAsync(validData)));

    navigate('/products');
  };

  return (
    <>
      <h2 className="fw-bold mb-2 text-main text-uppercase">Авторизация</h2>
      <p className="text-black-50 mb-4">Введите e-mail и пароль</p>
      <SignInForm
        signInHandler={signInHandler}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      {isLoading && <ModalLoader />}
    </>
  );
}
