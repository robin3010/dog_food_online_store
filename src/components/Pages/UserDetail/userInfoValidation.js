import * as Yup from 'yup';

export const editUserInfoValidationScheme = Yup.object({
  name: Yup.string()
    .matches(/(?:\s*[a-zA-Zа-яА-Я_]+)+/, 'Введите корректное имя пользователя')
    .min(2, 'Минимум 2 символа')
    .max(30, 'Не более 30 символов')
    .required(' '),
  about: Yup.string()
    .max(200, 'Не более 200 символов'),
});

export const editUserAvatarValidationScheme = Yup.object({
  avatar: Yup.string().url('Введите корректный url-адрес'),
});
