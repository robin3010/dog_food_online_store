import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeIsCheckedState } from '../../../../redux/slices/wishlistSlice';
import { WishlistButton } from '../../../Buttons/WishlistButton/WishlistButton';
import { AddToCartButton } from '../../../Buttons/AddToCartButton/AddToCartButton';
import { ProductAvailableQuantity } from '../../../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductPrice } from '../../../ProductElements/ProductPrice/ProductPrice';
import { NonExistentProductCard } from '../../../Buttons/NonExistentProductCard/NonExistentProductCard';

export function WishlistProductItem({ item }) {
  const dispatch = useDispatch();

  const {
    available,
    discount,
    id,
    isChecked,
    name,
    clientImage,
    price,
    stock,
    err,
  } = item;

  const selectItemHandler = () => {
    dispatch(changeIsCheckedState(id));
  };

  if (err) {
    return <NonExistentProductCard id={id} listType="wishlist" />;
  }

  return (
    <div className="col-12 wishlist__product_card">
      <div className="card p-3 position-relative">
        <div
          className="position-absolute ps-2 pt-2 top-0 start-0 z-1"
        >
          <input
            type="checkbox"
            onChange={selectItemHandler}
            className="form-check-input m-0"
            checked={isChecked}
          />
        </div>
        <div className="row g-3">
          <div className="col-12 col-sm-auto">
            <Link to={`/products/${id}`} className="position-relative">
              <div className="overlayable_content d-flex flex-column">
                <div
                  className="mx-auto mx-sm-0 product__card-img wishlist__product_card-img"
                >
                  <img src={clientImage} alt="..." />
                </div>
                <div className="overlay-action">
                  <i className="fa-regular fa-eye fa-2x" />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-sm">
            <div className="d-flex flex-column justify-content-between h-100">
              <Link to={`/products/${id}`}>
                <p>{name}</p>
              </Link>
              <div className="d-flex gap-3">
                <ProductAvailableQuantity available={available} stock={stock} />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="d-flex flex-column align-items-end fw-semibold pb-3">
                <ProductPrice price={price} discount={discount} column />
              </div>
              <div className="d-flex justify-content-end gap-2 product__card">
                <WishlistButton id={id} />
                <AddToCartButton item={item} textual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
