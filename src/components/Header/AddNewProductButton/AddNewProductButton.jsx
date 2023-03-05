import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthTokenSelector } from '../../../redux/slices/userSlice';
import { AddProductModal } from '../../Modals/UserProductModals/AddProductModal/AddProductModal';

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
            bg-body-tertiary bg-opacity-75 opacity-75"
      >
        <i className="fa-solid fa-plus" />
      </button>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        setIsOpen={setIsAddProductModalOpen}
      />
    </>
  );
}
