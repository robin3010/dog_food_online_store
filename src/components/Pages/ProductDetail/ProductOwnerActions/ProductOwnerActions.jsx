import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { shopApi } from '../../../../api/shopApi';
import { getUserDataSelector } from '../../../../redux/slices/userSlice';
import { RemoveItemsModal } from '../../../Modals/RemoveItemsModal/RemoveItemsModal';
import { EditProductModal } from '../../../Modals/UserProductModals/EditProductModal/EditProductModal';

export function ProductOwnerActions({ item }) {
  const { id: userId, authToken } = useSelector(getUserDataSelector);
  const { productId } = useParams();
  const { author: { _id: authorId } } = item;

  const navigate = useNavigate();

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const openEditProductModalHandler = () => {
    setIsEditProductModalOpen(true);
  };

  const {
    mutateAsync: mutateDelete, isError, isLoading, reset,
  } = useMutation({
    mutationFn: (id) => shopApi.deleteProduct(authToken, id),
  });

  const deleteUserProductHandler = async () => {
    reset();
    await mutateDelete(productId);

    if (!isLoading && !isError) {
      navigate('..', {
        relative: 'path',
      });
    }
  };

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const openRemoveModalHandler = () => {
    setIsRemoveModalOpen(true);
  };

  if (authorId !== userId) return null;

  return (
    <>
      <div className="d-flex gap-2">
        <button
          onClick={openEditProductModalHandler}
          className="btn btn-alt-outline-secondary"
          type="button"
        >
          Редактировать
        </button>

        <button
          onClick={openRemoveModalHandler}
          className="btn btn-primary"
          type="button"
        >
          Удалить
        </button>
      </div>
      <EditProductModal
        isOpen={isEditProductModalOpen}
        setIsOpen={setIsEditProductModalOpen}
        item={item}
      />
      <RemoveItemsModal
        isOpen={isRemoveModalOpen}
        setIsOpen={setIsRemoveModalOpen}
        name={item.name}
        ids={item.id}
        actionFn={deleteUserProductHandler}
      />
    </>
  );
}
