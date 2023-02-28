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
