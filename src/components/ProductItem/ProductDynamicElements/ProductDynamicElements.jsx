export function DiscountPrice({ price, discount }) {
  if (!discount) return '';

  return (
    <span className="me-2">
      {`${price - price / discount} \u20BD`}
    </span>

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
