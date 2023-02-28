import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  getWishlistSelector,
  removeFromWishlist,
} from '../../../redux/slices/wishlistSlice';
import {
  WishlistButtonTooltip,
} from '../../ProductElements/ProductTooltips/ProductTooltips';
import '../../../css/tooltip.css';

export function WishlistButton({ id }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(getWishlistSelector);

  const isWishlisted = wishlist.findIndex((el) => el.id === id) !== -1;

  const WishlistHandler = (e) => {
    e.preventDefault();
    if (!isWishlisted) {
      return dispatch(addToWishlist(id));
    }
    return dispatch(removeFromWishlist(id));
  };

  return (
    <div className="ps-0 p-1 ps-sm-1 btn-tooltip tooltip-up">
      <WishlistButtonTooltip isWishlisted={isWishlisted} />
      <button
        onClick={WishlistHandler}
        type="button"
        className={clsx('btn', 'border-2', 'btn-wishlist', {
          added: isWishlisted,
        })}
      >
        <i className="fa-regular fa-heart fa-lg" />
      </button>
    </div>
  );
}
