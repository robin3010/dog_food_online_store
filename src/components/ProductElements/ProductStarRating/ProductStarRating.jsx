import './ProductStarRating.css';

export function ProductStarRating({ rating }) {
  const starTotal = 5;

  const starPercentage = (rating / starTotal) * 100;
  const starPercentageRounded = `${starPercentage - (starPercentage % 10)}%`;

  return (
    <div className="badge text-main bg-body-secondary bg-opacity-75 fs-6 py-3">
      <div className="stars-outer">
        <div className="stars-inner" style={{ width: starPercentageRounded }} />
      </div>
      <span className="ms-1 align-middle">{rating}</span>
    </div>

  );
}
