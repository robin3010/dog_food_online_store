import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCheckoutSelector } from '../../../redux/slices/checkoutSlice';

export function AddToCartButton({ item, textual }) {
  const { available, id } = item;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector(getCheckoutSelector);

  const isAddedToCart = checkout.findIndex((el) => el.id === id) !== -1;

  const getButtonInner = () => {
    if (textual) {
      return (!isAddedToCart ? 'Купить' : 'В корзине');
    }
    return (
      <i className={clsx(
        'fa-solid',
        'fa-lg',
        { 'fa-shopping-cart': !isAddedToCart, cart__icon: !isAddedToCart },
        { 'fa-check': isAddedToCart },
      )}
      />
    );
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (!isAddedToCart) {
      return dispatch(addToCart(item));
    }
    return navigate('/checkout');
  };

  return (
    <div className="p-1 pe-0">
      <button
        onClick={addToCartHandler}
        type="button"
        className={clsx(
          'btn',
          'border-2',
          'btn-product-cart-add',
          { added: isAddedToCart },
        )}
        style={textual ? { minWidth: '6.5rem' } : {}}
        disabled={!available}
      >
        {getButtonInner()}
      </button>
    </div>

  );
}
