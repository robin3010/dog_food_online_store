import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { shopApi } from '../../../../api/shopApi';
import { getAuthTokenSelector } from '../../../../redux/slices/userSlice';
import { getProductReviewsQueryKey } from '../../../../utils/queryUtils';
import { getAvgRating, renameIdKey, roundRating } from '../../../../utils/utils';
import { withQuery } from '../../../HOCs/withQuery';
import { ProductStarRating } from '../../../ProductElements/ProductStarRating/ProductStarRating';
import { AddReviewForm } from '../../../Forms/AddReviewForm/AddReviewForm';
import { ProductReview } from './ProductReview/ProductReview';

function ProductReviewsReturn({ reviews, avgRating }) {
  if (!reviews.length) {
    return (
      <div className="p-4 text-center">
        <h5 className="mb-3 fw-normal">
          Отзывов ещё нет — ваш может стать первым
        </h5>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div className="
        d-flex-inline flex-column
        bg-body-secondary bg-opacity-50
        rounded-2
        py-3 ps-2"
      >
        <div className="mb-3">
          <span>Общий Рейтинг: </span>
          <ProductStarRating rating={avgRating} />
        </div>
        <AddReviewForm />
      </div>
      {reviews.map((review, index) => (
        <ProductReview
          key={review.id}
          review={{ ...review }}
          last={reviews.length - 1 === index}
        />
      ))}
    </div>
  );
}

const ProductReviewsReturnWithQuery = withQuery(ProductReviewsReturn);

export function ProductReviews() {
  const { productId } = useParams();
  const authToken = useSelector(getAuthTokenSelector);

  const {
    data, isLoading, isFetching, isError, error, refetch,
  } = useQuery({
    queryKey: getProductReviewsQueryKey(productId),
    queryFn: () => shopApi.getProductReviews(productId, authToken),
  });

  const reviews = data && renameIdKey(roundRating(data));
  const avgRating = reviews?.length ? getAvgRating(reviews) : 0;

  return (
    <ProductReviewsReturnWithQuery
      reviews={reviews}
      avgRating={avgRating}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
}
