import clsx from 'clsx';
import { formatPrice } from '../../../utils/utils';

export function Price({ price, discount, column }) {
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

export function ProductAvailableQuantity({ available, stock }) {
  // eslint-disable-next-line consistent-return
  const checkAvailableQuantity = () => {
    if (!available || stock === 0) {
      return <span className="text-danger">нет в наличии</span>;
    }
    if (stock >= 10) {
      return <span className="text-success">в наличии</span>;
    }
    if (stock >= 4) {
      return <span className="text-warning">мало</span>;
    }
    if (stock > 0) {
      let str = 'осталось';
      if (stock === 1) str = 'осталась';
      return <span className="text-danger">{`${str} ${stock} шт.`}</span>;
    }
  };

  return (
    <div>
      <span>Наличие: </span>
      <span>{checkAvailableQuantity()}</span>
    </div>

  );
}

export function WishlistButtonTooltip({ isWishlisted }) {
  return (
    <span className="btn-tooltip__text">
      {isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
    </span>
  );
}

export function ItemCountLimitTooltip({ stock, count }) {
  if (count === stock) {
    return (
      <span className="btn-tooltip__text">
        {`Данный товар доступен только в количестве ${stock} шт.`}
      </span>
    );
  }
}
