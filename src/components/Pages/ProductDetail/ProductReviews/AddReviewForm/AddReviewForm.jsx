import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { shopApi } from '../../../../../api/shopApi';
import { getAuthTokenSelector } from '../../../../../redux/slices/userSlice';
import { getProductReviewsQueryKey } from '../../../../../utils/queryUtils';
import './AddReviewForm.css';

export function AddReviewForm() {
  const { productId } = useParams();
  const authToken = useSelector(getAuthTokenSelector);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (newReview) => shopApi.addNewProductReview(productId, authToken, newReview),
  });

  const AddNewReviewHandler = async (values, { resetForm }) => {
    const formattedData = {
      ...values,
      rating: values.rating.toString(),
    };

    await mutateAsync(formattedData);

    queryClient.invalidateQueries({
      queryKey: getProductReviewsQueryKey(productId),
    });

    const $AddReviewForm = document.getElementById('collapseAddReview');
    // eslint-disable-next-line no-undef, no-new
    new bootstrap.Collapse($AddReviewForm);

    setTimeout(() => {
      resetForm();
    }, 300);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        data-bs-toggle="collapse"
        data-bs-target="#collapseAddReview"
      >
        Добавить отзыв
      </button>
      <div className="collapse mt-2 pe-2" id="collapseAddReview">
        <Formik
          initialValues={{ text: '', rating: 3 }}
          onSubmit={AddNewReviewHandler}
        >
          {({ values, initialValues }) => (
            <Form>
              <Field
                component="textarea"
                name="text"
                className="form-control"
                rows="4"
                placeholder="Расскажите о товаре..."
              />
              <div className="row my-3 gx-3 align-items-center">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="rating" className="col-auto col-form-label">Оценка:</label>
                <div className="col col-md-5 d-flex">
                  <Field
                    type="range"
                    name="rating"
                    id="rating"
                    className="form-range"
                    min="1"
                    max="5"
                  />
                  <span className="ms-3">{values.rating}</span>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2 ms-auto"
                // data-bs-toggle="collapse"
                // data-bs-target="#collapseAddReview"
                disabled={values.text === initialValues.text}
              >
                Отправить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
