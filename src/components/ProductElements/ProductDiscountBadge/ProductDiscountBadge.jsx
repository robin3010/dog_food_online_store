import clsx from 'clsx';

export function ProductDiscountBadge({ discount }) {
  return (
    <span
      className={clsx(
        'position-absolute',
        'badge',
        'rounded-pill',
        'product__card-badge bg-gradient',
        { 'd-none': !discount },
      )}
    >
      {`-${discount}%`}
    </span>
  );
}
