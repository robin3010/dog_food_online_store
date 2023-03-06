import { Field, Form, Formik } from 'formik';
import { ModalLoader } from '../../Loaders/ModalLoader';
import { maxValues, userProductValidationSchema } from '../../Modals/UserProductModals/userProductValidation';
import { FetchErrorAlert } from '../Errors/FetchErrorAlert';
import { FloatingInput } from '../FormInputs/FloatingInput';
import { userProductFormVariants } from '../formsConstants';
import productNoPhoto from '../../../images/product_nophoto.png';
import './UserProductForm.css';
import { getFormInitialValues } from '../formsUtils/formsUtils';

export function UserProductForm({
  type, formPrefill,
  submitHandler, closeHandler,
  isLoading, isError, error,
}) {
  const { header, submitTitle } = userProductFormVariants[type];
  const formInitValues = getFormInitialValues(formPrefill);

  return (
    <>
      <div className="user-product__form">
        <h5 className="card-header text-center py-3 text-uppercase">
          {header}
        </h5>
        <div className="card-body">
          <Formik
            initialValues={formInitValues}
            validateOnMount
            // enableReinitialize
            validationSchema={userProductValidationSchema}
            onSubmit={submitHandler}
          >
            {({ isValid, values }) => (
              <Form className="row g-3">
                <div className="col-12 mb-2">
                  <div className="d-flex justify-content-center bg-body rounded">
                    <img
                      src={values.pictures || productNoPhoto}
                      alt="..."
                      className="py-1"
                    />
                  </div>
                </div>
                <div className="col-12 form-floating mb-3">
                  <FloatingInput
                    name="name"
                    placeholder="Наименование"
                    label="Наименование"
                  />
                </div>
                <div className="col-12 form-floating fix-overlap mb-3">
                  <FloatingInput
                    component="textarea"
                    name="description"
                    placeholder="Описание"
                    label="Описание"
                  />
                </div>
                <div className="col-12 form-floating mb-3">
                  <FloatingInput
                    name="pictures"
                    placeholder="Фото товара (URL)"
                    label="Фото товара (URL)"
                  />
                </div>
                <div className="col-md-6 form-floating mb-3">
                  <FloatingInput
                    mode="numeric"
                    name="wight"
                    placeholder="Вес, гр."
                    label="Вес, гр."
                    maxValue={maxValues.wight}
                  />
                </div>
                <div className="col-md-6 form-floating mb-3">
                  <FloatingInput
                    mode="numeric"
                    name="stock"
                    placeholder="Наличие, ед."
                    label="Наличие, ед."
                    maxValue={maxValues.stock}
                  />
                </div>
                <div className="col-md-6 form-floating mb-3">
                  <FloatingInput
                    mode="numeric"
                    name="price"
                    placeholder="Цена, руб."
                    label="Цена, руб."
                    maxValue={maxValues.price}
                  />
                </div>
                <div className="col-md-6 form-floating mb-3">
                  <FloatingInput
                    mode="numeric"
                    name="discount"
                    placeholder="Размер скидки"
                    label="Размер скидки"
                    maxValue={maxValues.discount}
                  />
                </div>
                <div className="col-9 form-floating mb-3">
                  <FloatingInput
                    type="text"
                    name="tags"
                    placeholder="Тэги товара (через запятую)"
                    label="Тэги товара (через запятую)"
                  />
                </div>
                <div className="col-3 mb-3">
                  <div className="
                    form-check
                    d-flex justify-content-center
                    bg-body rounded
                    fs-6 py-3"
                  >
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      name="available"
                      id="available"
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label
                      className="form-check-label user-select-none ps-2"
                      htmlFor="available"
                    >
                      Доступен
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <FetchErrorAlert isError={isError} error={error} />
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
                    {submitTitle}
                  </button>
                  <button
                    onClick={closeHandler}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    Отмена
                  </button>
                  {/* eslint-disable-next-line react/button-has-type */}
                  {/* <button type="reset" className="btn btn-outline-secondary">
                    Очистить
                  </button> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {isLoading && <ModalLoader />}
    </>
  );
}
