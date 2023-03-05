/* eslint-disable camelcase */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { shopApi } from '../../../../../api/shopApi';
import { getUserDataSelector } from '../../../../../redux/slices/userSlice';
import { defaultImages } from '../../../../../utils/constants';
import { getProductReviewsQueryKey } from '../../../../../utils/queryUtils';
import { formatDate, setImage } from '../../../../../utils/utils';
import { ProductStarRating } from '../../../../ProductElements/ProductStarRating/ProductStarRating';
import checkoutStyles from '../../../Checkout/Checkout.module.css';

export function ProductReview({ review, last }) {
  const {
    author, text, created_at, updated_at, rating, id: reviewId, product: productId,
  } = review;
  const { id: userId, authToken } = useSelector(getUserDataSelector);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => shopApi.deleteProductReview(productId, authToken, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProductReviewsQueryKey(productId),
      });
    },
  });

  const deleteReviewHandler = async () => {
    await mutateAsync();
  };

  const deleteButton = (author._id === userId) && (
    <button
      onClick={deleteReviewHandler}
      className={`border-0 bg-transparent p-2 pe-0 mb-2 ${checkoutStyles.remove}`}
      type="button"
    >
      Удалить
    </button>
  );

  const isUpdated = updated_at !== created_at;
  const formatCreateTime = formatDate(created_at);
  const formatUpdateTime = formatDate(updated_at);

  return (
    <>
      <div className="d-flex justify-content-between py-1">
        <div className="align-self-center">
          <img
            src={setImage(author.avatar, defaultImages.type.avatar)}
            className="vendor__logo rounded-circle d-inline-block ms-2 me-1"
            alt="..."
          />
          <b className="align-middle">{author.name}</b>
        </div>
        <div className="d-flex flex-column justify-content-end align-items-end py-2 text-muted">
          {deleteButton}
          <span>{formatCreateTime}</span>
          {isUpdated && <span>{formatUpdateTime}</span>}
        </div>
      </div>
      <ProductStarRating rating={rating} />
      <p>{text}</p>
      <hr className={clsx(
        'px-4',
        { 'd-none': last },
      )}
      />
    </>
  );
}
