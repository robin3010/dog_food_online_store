import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ModalContainer } from '../../ModalContainer';
import { shopApi } from '../../../../api/shopApi';
import { getAuthTokenSelector } from '../../../../redux/slices/userSlice';
import { getGoodsListQueryKey } from '../../../../utils/queryUtils';
import { formatNewProductData } from './addProductModalUtils/addProductUtils';
import { UserProductForm } from '../../../Forms/UserProductForm/UserProductForm';
import { userProductFormVariants } from '../../../Forms/formsConstants';

export function AddProductModal({ isOpen, setIsOpen }) {
  const authToken = useSelector(getAuthTokenSelector);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync, isLoading, isError, error, reset,
  } = useMutation({
    mutationFn: (newProduct) => shopApi.addNewProduct(authToken, newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getGoodsListQueryKey(),
      });
    },
  });

  const closeAddProductModalHandler = () => {
    setIsOpen(false);
    reset();
  };

  const submitNewProductHandler = async (values) => {
    const validData = formatNewProductData(values);

    console.log(validData);

    const newProduct = await mutateAsync(validData);

    if (!isError && !isLoading) {
      console.log(newProduct);

      closeAddProductModalHandler();
      navigate(`/products/${newProduct._id}`);
    }
  };

  return (
    <ModalContainer isOpen={isOpen} closeHandler={closeAddProductModalHandler}>
      <UserProductForm
        type={userProductFormVariants.type.add}
        submitHandler={submitNewProductHandler}
        closeHandler={closeAddProductModalHandler}
        isLoading={isLoading}
        isError={isError}
        error={error}

      />
    </ModalContainer>
  );
}
