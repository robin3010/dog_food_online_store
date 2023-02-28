import { useDispatch } from 'react-redux';

import {
  changeIsCheckedState,
} from '../../../../redux/slices/wishlistSlice';
import { calcCondition } from '../../../../utils/utils';
import { WishlistButton } from '../../../Buttons/WishlistButton/WishlistButton';
import { AddToCartButton } from '../../../Buttons/AddToCartButton/AddToCartButton';
import {
  ProductAvailableQuantity,
} from '../../../ProductElements/ProductAvailableQuantity/ProductAvailableQuantity';
import { ProductPrice } from '../../../ProductElements/ProductPrice/ProductPrice';

export function WishlistProductItem({ item }) {
  const dispatch = useDispatch();

  const {
    name,
    price,
    pictures,
    discount,
    stock,
    available,
    id,
    isChecked,
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
          <div className="col-auto">
            <div
              className="product__card-img checkout__product_card-img"
            >
              <img src={pictures} alt="..." />
            </div>
          </div>
          <div className="col">
            <div className="d-flex flex-column justify-content-between h-100">
              <p className="card-text">{name}</p>
              <div className="d-flex gap-3">
                <ProductAvailableQuantity available={available} stock={stock} />
                <span>{`rating ${calcCondition(item, 'rating')}`}</span>
              </div>
            </div>
          </div>
          <div className="col">
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
