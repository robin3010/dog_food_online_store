import * as Yup from 'yup';

export const signInValidationScheme = Yup.object({
  email: Yup.string()
    .email('Введите корректный e-mail')
    .required('Обязательно'),
  password: Yup.string()
    .required('Обязательно'),
  remember: Yup.boolean()
    .default(false),
});

export const signUpValidationScheme = Yup.object({
  email: Yup.string()
    .email('Введите корректный e-mail')
    .required('Обязательно'),
  group: Yup.string()
    .matches(/\w{2}\d{1}/, 'Формат "aa1"')
    .max(3, 'Формат "aa1"')
    .required('Обязательно'),
  password: Yup.string()
    .required('Обязательно'),
  confirmPassword: Yup.string()
    .required('Обязательно')
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});
