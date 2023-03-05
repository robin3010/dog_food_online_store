import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/slices/checkoutSlice';
import { removeFromWishlist } from '../../../redux/slices/wishlistSlice';
import checkoutStyles from '../../Pages/Checkout/Checkout.module.css';

export function NonExistentProductCard({ id, listType }) {
  const dispatch = useDispatch();

  const removeDeletedItemHandler = () => {
    if (listType === 'checkout') return dispatch(removeFromCart(id));
    if (listType === 'wishlist') return dispatch(removeFromWishlist(id));
    return undefined;
  };

  return (
    <div className="col-12">
      <div className="card p-3 flex-sm-row align-items-center">
        <div className="fs-6 mx-3">Такого товара больше нет...</div>
        <button
          onClick={removeDeletedItemHandler}
          className={`border-0 bg-transparent p-0 ${checkoutStyles.remove}`}
          type="button"
        >
          Удалить
        </button>
      </div>
    </div>

  );
}
