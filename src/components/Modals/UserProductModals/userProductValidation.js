import * as Yup from 'yup';

export const maxValues = {
  wight: 1e6,
  stock: 9999,
  price: 1e9,
  discount: 99,
};

export const userProductValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(100, 'Не более 100 символов')
    .required('Обязательно'),
  description: Yup.string()
    .max(1000, 'Не более 1000 символов')
    .required('Обязательно'),
  pictures: Yup.string().url('Введите корректный url-адрес'),
  wight: Yup.number()
    .min(0, 'Должно быть больше 0')
    .integer('Только целые числа')
    .max(maxValues.wight, 'Максимальное значение 1 000 000'),
  stock: Yup.number()
    .min(0, 'Введите положительное значение')
    .integer('Только целые числа')
    .max(maxValues.stock, 'Максимальное значение 9999'),
  price: Yup.number()
    .min(1, 'Должно быть больше 1')
    .integer('Только целые числа')
    .max(maxValues.price, 'Слишком дорого!')
    .required('Обязательно'),
  discount: Yup.number()
    .min(0, 'Введите положительное значение')
    .integer('Только целые числа')
    .max(maxValues.discount, 'Не более 99'),
  tags: Yup.string().matches(
    /^(?:\s*[a-zA-Zа-яА-Я]+,\s*)*(?:\s*[a-zA-Zа-яА-Я]+,?\s*$)/,
    {
      message: 'Теги должны содержать только буквы',
      excludeEmptyString: true,
    },
  ),
});
