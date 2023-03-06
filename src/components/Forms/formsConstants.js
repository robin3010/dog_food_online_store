export const userProductFormVariants = {
  type: {
    add: 'add',
    edit: 'edit',
  },
  add: {
    header: 'Добавление товара',
    submitTitle: 'Добавить',
  },
  edit: {
    header: 'Редактирование товара',
    submitTitle: 'Сохранить',
  },
};

export const userProductFormInitValues = {
  name: '',
  description: '',
  pictures: '',
  wight: '',
  stock: '',
  price: '',
  discount: '',
  tags: '',
  available: true,
};
