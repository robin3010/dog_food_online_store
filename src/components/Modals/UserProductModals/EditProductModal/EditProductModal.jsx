import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ModalContainer } from '../../ModalContainer';
import { shopApi } from '../../../../api/shopApi';
import { getAuthTokenSelector } from '../../../../redux/slices/userSlice';
import { getProductDetailQueryKey } from '../../../../utils/queryUtils';
import { UserProductForm } from '../../../Forms/UserProductForm/UserProductForm';
import { userProductFormVariants } from '../../../Forms/formsConstants';
import { formatNewProductData } from '../AddProductModal/addProductModalUtils/addProductUtils';

export function EditProductModal({ isOpen, setIsOpen, item }) {
  const { productId } = useParams();
  const authToken = useSelector(getAuthTokenSelector);

  const queryClient = useQueryClient();

  const {
    mutateAsync, isLoading, isError, error, reset,
  } = useMutation({
    mutationFn: (editedProduct) => shopApi.editProduct(authToken, productId, editedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductDetailQueryKey(productId),
      });
    },
  });

  const closeEditProductModalHandler = () => {
    setIsOpen(false);
    reset();
  };

  const submitEditedProductHandler = async (values) => {
    const validData = formatNewProductData(values);

    const newProduct = await mutateAsync(validData);

    if (!isError && !isLoading) {
      console.log(newProduct);

      closeEditProductModalHandler();
    }
  };

  return (
    <ModalContainer isOpen={isOpen} closeHandler={closeEditProductModalHandler}>
      <UserProductForm
        type={userProductFormVariants.type.edit}
        formPrefill={item}
        submitHandler={submitEditedProductHandler}
        closeHandler={closeEditProductModalHandler}
        isLoading={isLoading}
        isError={isError}
        error={error}

      />
    </ModalContainer>
  );
}
