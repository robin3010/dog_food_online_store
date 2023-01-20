import * as Yup from 'yup';

export const signInValidationScheme = Yup.object({
  email: Yup.string()
    .email('Введите корректный e-mail')
    .required(' '),
  password: Yup.string()
    .required(' '),
  remember: Yup.boolean()
    .default(false),
});

export const signUpValidationScheme = Yup.object({
  email: Yup.string()
    .email('Введите корректный e-mail')
    .required(' '),
  group: Yup.string()
    .matches(/\w{2}\d{1}/, ' ')
    .max(3, ' ')
    .required(' '),
  password: Yup.string()
    .required(' '),
  confirmPassword: Yup.string()
    .required(' ')
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
});
