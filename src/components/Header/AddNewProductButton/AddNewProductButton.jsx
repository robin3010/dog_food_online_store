import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { AddProductModal } from '../../Modals/UserProductModals/AddProductModal/AddProductModal';
import { NavLinkTooltip } from '../../ProductElements/ProductTooltips/ProductTooltips';

export function AddNewProductButton() {
  const authToken = useSelector(getAuthTokenSelector);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const openAddProductModalHandler = () => {
    setIsAddProductModalOpen(true);
  };

  if (!authToken) return null;

  return (
    <>
      <button
        type="button"
        onClick={openAddProductModalHandler}
        className="
            header__new-product
            nav-link rounded-circle
            btn-tooltip header-tooltip
            bg-body-tertiary bg-opacity-75"
      >
        <NavLinkTooltip text="Добавить товар" />
        <i className="fa-solid fa-plus" />
      </button>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        setIsOpen={setIsAddProductModalOpen}
      />
    </>
  );
}
