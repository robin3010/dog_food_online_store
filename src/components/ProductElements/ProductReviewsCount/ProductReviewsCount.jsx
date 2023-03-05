export function ProductReviewsCount({ reviewsCount }) {
  return (
    <div className="
    badge text-main
    bg-body-secondary bg-opacity-75
    fs-6 py-3
    d-inline-block"
    >
      <div className="d-inline-block align-middle">
        <i className="fa-regular fa-message" />
      </div>
      <span className="ms-1 align-middle">{reviewsCount}</span>
    </div>
  );
}
