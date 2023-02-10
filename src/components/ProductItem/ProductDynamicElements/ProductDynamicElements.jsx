import clsx from 'clsx';
import { formattedPrice } from '../../../utils/utils';

export function Price({ price, discount, column }) {
  const defaultPriceStyles = 'strike-through fw-normal text-muted';

  const defaultPrice = () => (
    <span
      className={clsx({ [defaultPriceStyles]: discount })}
    >
      {formattedPrice(price)}
    </span>
  );

  if (!discount) { return defaultPrice(); }

  return (
    <>
      <span className={clsx({ 'me-2': !column })}>
        {formattedPrice((price - price / discount))}
      </span>
      {defaultPrice()}
    </>
  );
}

export function ProductAvailableQuantity({ available, quantity }) {
  // eslint-disable-next-line consistent-return
  const checkAvailableQuantity = () => {
    if (!available || quantity === 0) {
      return <span className="text-danger">нет в наличии</span>;
    }
    if (quantity >= 10) {
      return <span className="text-success">в наличии</span>;
    }
    if (quantity >= 4) {
      return <span className="text-warning">мало</span>;
    }
    if (quantity > 0) {
      let str = 'осталось';
      if (quantity === 1) str = 'осталась';
      return <span className="text-danger">{`${str} ${quantity} шт.`}</span>;
    }
  };

  return (
    <div>
      <span>Наличие: </span>
      <span>{checkAvailableQuantity()}</span>
    </div>

  );
}
