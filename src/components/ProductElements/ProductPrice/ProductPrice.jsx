import clsx from 'clsx';
import { formatPrice } from '../../../utils/utils';

export function ProductPrice({ price, discount, column }) {
  const defaultPriceStyles = 'strike-through fw-normal text-muted';

  const defaultPrice = () => (
    <span
      className={clsx({ [defaultPriceStyles]: discount })}
    >
      {formatPrice(price)}
    </span>
  );

  if (!discount) { return defaultPrice(); }

  return (
    <>
      <span className={clsx('discount', { 'me-2': !column })}>
        {formatPrice(price - ((price * discount) / 100))}
      </span>
      {defaultPrice()}
    </>
  );
}
