import { useDispatch } from 'react-redux';
import { changeIsCheckedState } from '../../../../redux/slices/wishlistSlice';
import { WishlistButton } from '../../../Buttons/WishlistButton/WishlistButton';
import { AddToCartButton } from '../../../Buttons/AddToCartButton/AddToCartButton';
import { ProductAvailableQuantity } from '../../../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductPrice } from '../../../ProductElements/ProductPrice/ProductPrice';

export function WishlistProductItem({ item }) {
  const dispatch = useDispatch();

  const {
    available,
    discount,
    id,
    isChecked,
    name,
    pictures,
    price,
    stock,
  } = item;

  const selectItemHandler = () => {
    dispatch(changeIsCheckedState(id));
  };

  return (
    <div className="col-12">
      <div className="card p-3 position-relative">
        <div
          className="position-absolute ps-2 pt-2 top-0 start-0"
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
            <div
              className="mx-auto mx-sm-0 product__card-img checkout__product_card-img"
            >
              <img src={pictures} alt="..." />
            </div>
          </div>
          <div className="col-12 col-sm">
            <div className="d-flex flex-column justify-content-between h-100">
              <p className="card-text">{name}</p>
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
