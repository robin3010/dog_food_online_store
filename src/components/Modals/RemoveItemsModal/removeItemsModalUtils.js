import { clearCart, removeFromCart, removeSelectedFromCart } from '../../../redux/slices/checkoutSlice';
import { clearWishlist, removeSelectedFromWishlist } from '../../../redux/slices/wishlistSlice';

export const REMOVE_TYPE_DATASET = {
  item: 'item',
  selectedCart: 'selectedCart',
  clearCart: 'clearCart',
  selectedWishlist: 'selectedWishlist',
  clearWishlist: 'clearWishlist',
};

export const removeTypeConfig = {
  [REMOVE_TYPE_DATASET.item]: {
    func: (id) => removeFromCart(id),
    message: 'Удалить товар ',
    buttonTitle: 'Удалить',
  },
  [REMOVE_TYPE_DATASET.selectedCart]: {
    func: (ids) => removeSelectedFromCart(ids),
    message: 'Удалить выбранные товары',
    buttonTitle: 'Удалить',
  },
  [REMOVE_TYPE_DATASET.selectedWishlist]: {
    func: (ids) => removeSelectedFromWishlist(ids),
    message: 'Убрать выбранные товары из избранного',
    buttonTitle: 'Убрать',
  },
  [REMOVE_TYPE_DATASET.clearCart]: {
    func: () => clearCart(),
    message: 'Вы действительно хотите очистить содержимое корзины',
    buttonTitle: 'Очистить',
  },
  [REMOVE_TYPE_DATASET.clearWishlist]: {
    func: () => clearWishlist(),
    message: 'Вы действительно хотите очистить список избранного',
    buttonTitle: 'Очистить',
  },
};
