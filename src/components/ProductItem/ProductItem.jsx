import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, getCheckoutSelector } from '../../redux/slices/checkoutSlice';
import { calcCondition } from '../../utils/utils';
import {
  Price,
  ProductAvailableQuantity,
} from './ProductDynamicElements/ProductDynamicElements';

export function ProductItem({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector(getCheckoutSelector);

  const {
    name,
    price,
    pictures,
    discount,
    stock: quantity,
    available,
    // id,
  } = item;

  const itemIndex = checkout.findIndex((el) => el.id === item.id);

  const addToCartHandler = (elem) => {
    if (itemIndex === -1) {
      return dispatch(addItemToCart(elem));
    }
    return navigate('/checkout');
  };

  return (
    <div className="col">
      <div className="card h-100" style={{ minWidth: '18rem' }}>
        <div>
          <span>{`likes ${calcCondition(item, 'likes')}`}</span>
          <br />
          <span>{`reviews ${calcCondition(item, 'reviews')}`}</span>
          <br />
          <span>{`rating ${calcCondition(item, 'rating')}`}</span>
          <br />
          <span>{`discount ${calcCondition(item, 'discount')}`}</span>
        </div>
        <div className="product__card-picture pt-3">
          <img src={pictures} alt="..." />
        </div>
        <div className="card-body text-start">
          <p className="card-text">{name}</p>
        </div>
        <footer className="px-3 pb-3">
          <ProductAvailableQuantity available={available} quantity={quantity} />
          <div className="d-flex product__card">
            <div className="d-flex w-100 me-auto p-1 ps-0">
              <div
                className="d-flex bg-secondary bg-opacity-10
                border border-tertiary rounded w-100"
              >
                <p className="m-auto ms-2 fw-semibold product__card-price">
                  <Price price={price} discount={discount} />
                </p>
              </div>
            </div>
            <div className="p-1">
              <button
                type="button"
                className="btn btn-outline-danger card__btn"
              >
                <i className="fa-regular fa-heart fa-lg" />
              </button>
            </div>
            <div className="p-1 pe-0">
              <button
                onClick={() => addToCartHandler(item)}
                type="button"
                className={clsx(
                  'btn',
                  'btn-secondary',
                  { 'bg-warning': itemIndex !== -1 },
                )}
              >
                <i className="fa-solid fa-shopping-cart fa-lg" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
